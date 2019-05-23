import assert from 'assert';
import {writeFile} from 'fs';
import {promisify} from 'util';

interface IHooks {
  [name: string]: () => Promise<void>;
}

interface IFetchOutput {
  [name: string]: string;
}

interface IStackOutputPair {
  OutputKey: string;
  OutputValue: string;
}

interface IStackDescription {
  Outputs: IStackOutputPair[];
}

interface IStackDescriptionList {
  Stacks: IStackDescription[];
}

class AwsExportsPlugin {
  private readonly writer: Function;

  constructor (
    private serverless: Serverless,
    private options: Serverless.IOptions,
    private writeFileAsync?: Function
  ) {
    if (writeFileAsync) {
      this.writer = this.writeFileAsync;
    } else {
      this.writer = promisify(writeFile);
    }
  }

  public get hooks (): IHooks {
    return {
      'after:deploy:deploy': this.process.bind(this)
    };
  }

  private get output (): IOutput {
    return this.serverless.service.custom.output;
  }

  private get stackName (): string {
    const serviceName: string = this.serverless
      .service
      .getServiceName();
    const stage: string = this.serverless
      .getProvider(this.serverless.service.provider.name)
      .getStage();

    return `${serviceName}-${stage}`;
  }

  private async fetch (): Promise<IFetchOutput> {
    const stage: string = this.serverless
      .getProvider(this.serverless.service.provider.name)
      .getStage();
    const region: string = this.serverless
      .getProvider(this.serverless.service.provider.name)
      .getRegion();
    const {Stacks}: IStackDescriptionList = await this.serverless
      .getProvider(this.serverless.service.provider.name)
      .request(
        'CloudFormation',
        'describeStacks',
        {
          StackName: this.stackName
        },
        stage,
        region
      );

    const stack: IStackDescription = Stacks.pop() || {
      Outputs: []
    };
    const output: IStackOutputPair[] = stack.Outputs || [];

    return output.reduce(
      (obj: IStackOutputPair, item: IStackOutputPair) => ({
        ...obj,
        ...{
          [item.OutputKey]: item.OutputValue
        }
      }),
      {}
    );
  }

  private async writeFile (data: IFetchOutput): Promise<void> {
    for (const file of this.output.files) {
      await this.writer(file, `const awsmobile = {
  Auth: {
    identityPoolId: '${data.IdentityPoolId}',
    mandatorySignIn: true,
    region: '${data.Region}',
    userPoolId: '${data.UserPoolId}',
    userPoolWebClientId: '${data.UserPoolClientId}'
  },
  Storage: {
    AWSS3: {
      bucket: '${data.AssetsBucket}',
      region: '${data.Region}'
    }
  },
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_graphqlEndpoint: '${data[this.output.graphQlApiUrlName]}',
  aws_appsync_region: '${data.Region}'
};

export default awsmobile;
`);

      this.serverless.cli.log(`Stack Output saved to file: ${file}`);
    }
  }

  private validate (): void {
    assert(this.serverless.service, 'Invalid serverless configuration');
    assert(this.serverless.service.provider, 'Invalid serverless configuration');
    assert(this.serverless.service.provider.name, 'Invalid serverless configuration');
    assert(this.serverless.service.provider.name === 'aws', 'Only supported for AWS provider');
    assert(this.options && !this.options.noDeploy, 'Skipping deployment with --noDeploy flag');
  }

  private async process (): Promise<void> {
    try {
      this.validate();

      const data: IFetchOutput = await this.fetch();

      await this.writeFile(data);
    } catch (e) {
      this.serverless.cli.log(`Cannot process Stack Output: ${e.message}!`);
    }
  }
}

export = AwsExportsPlugin;
