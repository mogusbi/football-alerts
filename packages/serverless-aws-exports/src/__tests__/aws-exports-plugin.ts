///<reference path="../typings.d.ts"/>
import AwsExportsPlugin from '../aws-exports-plugin';

describe('AwsExportsPlugin', (): void => {
  let options: Serverless.IOptions;
  let serverless: Serverless;

  beforeEach((): void => {
    options = {
      region: 'eu-west-1',
      stage: 'local'
    };

    serverless = {
      cli: {
        log: jest.fn()
      },
      config: {
        servicePath: ''
      },
      getProvider: jest.fn().mockReturnValue({
        getRegion: jest.fn().mockReturnValue(options.region),
        getStage: jest.fn().mockReturnValue(options.stage),
        request: jest.fn().mockReturnValue({
          Stacks: [
            {
              Outputs: [
                {
                  OutputKey: 'GraphQlApiUrl',
                  OutputValue: 'https://y3kymhm2hnbsnbdgi37sxpfasy.appsync-api.eu-west-1.amazonaws.com/graphql'
                },
                {
                  OutputKey: 'IdentityPoolId',
                  OutputValue: 'eu-west-1:ad0342a6-de40-4c22-a155-a0edc036ab87'
                },
                {
                  OutputKey: 'Region',
                  OutputValue: 'eu-west-1'
                },
                {
                  OutputKey: 'UserPoolId',
                  OutputValue: 'eu-west-1_2sq18bIfD'
                },
                {
                  OutputKey: 'UserPoolClientId',
                  OutputValue: '1cmkd9fad5qg2ej0pvnp9vd1dd'
                }
              ]
            }
          ]
        })
      }),
      service: {
        custom: {
          output: {
            files: [
              'test-file-1.js',
              'test-file-2.js'
            ],
            graphQlApiUrlName: 'GraphQlApiUrl'
          }
        },
        getServiceName: jest.fn(),
        provider: {
          name: 'aws'
        }
      }
    };
  });

  it('should throw an error if service is not provided', async (): Promise<void> => {
    delete serverless.service;

    const plugin: AwsExportsPlugin = new AwsExportsPlugin(serverless, options);

    await plugin.hooks['after:deploy:deploy']();

    expect(serverless.cli.log).toHaveBeenCalledWith('Cannot process Stack Output: Invalid serverless configuration!');
  });

  it('should throw an error if no provider is set', async (): Promise<void> => {
    delete serverless.service.provider;

    const plugin: AwsExportsPlugin = new AwsExportsPlugin(serverless, options);

    await plugin.hooks['after:deploy:deploy']();

    expect(serverless.cli.log).toHaveBeenCalledWith('Cannot process Stack Output: Invalid serverless configuration!');
  });

  it('should throw an error if provider is not AWS', async (): Promise<void> => {
    serverless.service.provider.name = 'something';

    const plugin: AwsExportsPlugin = new AwsExportsPlugin(serverless, options);

    await plugin.hooks['after:deploy:deploy']();

    expect(serverless.cli.log).toHaveBeenCalledWith('Cannot process Stack Output: Only supported for AWS provider!');
  });

  it('should display an error if skipping deployment', async (): Promise<void> => {
    options.noDeploy = true;

    const plugin: AwsExportsPlugin = new AwsExportsPlugin(serverless, options);

    await plugin.hooks['after:deploy:deploy']();

    expect(serverless.cli.log).toHaveBeenCalledWith('Cannot process Stack Output: Skipping deployment with --noDeploy flag!');
  });

  it('should write the correct file', async (): Promise<void> => {
    const writeFileAsync: jest.Mock = jest.fn();
    const plugin: AwsExportsPlugin = new AwsExportsPlugin(serverless, options, writeFileAsync);

    await plugin.hooks['after:deploy:deploy']();

    expect(writeFileAsync).toHaveBeenCalledWith('test-file-1.js', `const awsmobile = {
  Auth: {
    identityPoolId: 'eu-west-1:ad0342a6-de40-4c22-a155-a0edc036ab87',
    mandatorySignIn: true,
    region: 'eu-west-1',
    userPoolId: 'eu-west-1_2sq18bIfD',
    userPoolWebClientId: '1cmkd9fad5qg2ej0pvnp9vd1dd'
  },
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_graphqlEndpoint: 'https://y3kymhm2hnbsnbdgi37sxpfasy.appsync-api.eu-west-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-west-1'
};

export default awsmobile;
`);
  });

  it('should write the file the correct number of times', async (): Promise<void> => {
    const writeFileAsync: jest.Mock = jest.fn();
    const plugin: AwsExportsPlugin = new AwsExportsPlugin(serverless, options, writeFileAsync);

    await plugin.hooks['after:deploy:deploy']();

    expect(writeFileAsync).toHaveBeenCalledTimes(2);
  });
});
