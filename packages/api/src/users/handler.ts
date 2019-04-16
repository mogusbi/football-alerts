import {CognitoUserPoolEvent, Handler} from 'aws-lambda';
import {DynamoDB} from 'aws-sdk';

const documentClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();
const TableName: string = process.env.TABLE_NAME;

function conditionalValue (input: string): string {
  if (input === undefined) {
    return null;
  }

  return input;
}

export const register: Handler = async (event: CognitoUserPoolEvent): Promise<CognitoUserPoolEvent> => {
  switch (event.triggerSource) {
  case 'PostAuthentication_Authentication':
  case 'PostConfirmation_ConfirmSignUp':
    const lastUpdate: Date = new Date();

    await documentClient
      .update({
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ExpressionAttributeValues: {
          ':emailAddress': event.request.userAttributes.email,
          ':forename': event.request.userAttributes.given_name,
          ':lastUpdate': lastUpdate.toUTCString(),
          ':name': `${event.request.userAttributes.given_name} ${event.request.userAttributes.family_name}`,
          ':surname': event.request.userAttributes.family_name,
          ':twitterHandle': conditionalValue(event.request.userAttributes.twitter_handle),
          ':website': conditionalValue(event.request.userAttributes.website)
        },
        Key: {
          id: event.request.userAttributes.sub
        },
        TableName,
        UpdateExpression: `
          set emailAddress = :emailAddress,
          forename = :forename,
          lastUpdate = :lastUpdate,
          #name = :name,
          surname = :surname,
          twitterHandle = :twitterHandle,
          website = :website
        `
      })
      .promise();

    break;
  default:
  }

  return event;
};
