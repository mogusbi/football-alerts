// tslint:disable interface-name
declare namespace Serverless {
  interface IOptions {
    stage: string | null;
    region: string | null;
    noDeploy?: boolean;
  }

  namespace Provider {
    class Aws {
      constructor (serverless: Serverless, options: Serverless.IOptions);

      public getRegion (): string;

      public getStage (): string;

      public async request <T> (service: string, method: string, data: {}, stage: string, region: string): Promise<T>;
    }
  }
}

declare interface IOutput {
  files: string[];
  graphQlApiUrlName: string;
}

declare interface Serverless {
  config: {
    servicePath: string;
  };
  cli: {
    log (message: string): null;
  };
  service: {
    custom: {
      output: IOutput;
    };
    provider: {
      name: string;
    };
    getServiceName (): string;
  };
  getProvider (name: string): Serverless.Provider.Aws;
}
