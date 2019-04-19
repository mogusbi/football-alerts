import {APIGatewayProxyResult, Handler} from 'aws-lambda';
import {StepFunctions} from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {User, UserSettingsImport} from '../models';

const documentClient: DocumentClient = new DocumentClient();
const stepFunctions: StepFunctions = new StepFunctions();
const stateMachineArn: string = process.env.STATE_MACHINE_ARN;
const TableName: string = process.env.TABLE_NAME;

export const handler: Handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const {Items}: DocumentClient.ScanOutput = await documentClient
      .scan({
        TableName
      })
      .promise();

    const publishers: User<UserSettingsImport>[] = Items
      .filter(
        (publisher: User<UserSettingsImport>): boolean => Boolean(publisher.settings) && publisher.settings.import !== null
      )
      .map(
        (publisher: User<UserSettingsImport>): User<UserSettingsImport> => publisher
      );

    for (const publisher of publishers) {
      await stepFunctions
        .startExecution({
          input: JSON.stringify(publisher),
          stateMachineArn
        })
        .promise();
    }

    return {
      body: JSON.stringify(publishers),
      statusCode: 200
    };
  } catch (e) {
    return {
      body: e.message,
      statusCode: 500
    };
  }
};
