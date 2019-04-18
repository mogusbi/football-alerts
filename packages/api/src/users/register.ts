import {CognitoUserPoolEvent, Handler} from 'aws-lambda';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';

const documentClient: DocumentClient = new DocumentClient();
const TableName: string = process.env.TABLE_NAME;

function conditionalValue (input: string): string {
  if (input === undefined) {
    return null;
  }

  return input;
}

export const handler: Handler = async (event: CognitoUserPoolEvent): Promise<CognitoUserPoolEvent> => {
  switch (event.triggerSource) {
  case 'PostAuthentication_Authentication':
  case 'PostConfirmation_ConfirmSignUp':
    const now: Date = new Date();

    await documentClient
      .update({
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ExpressionAttributeValues: {
          ':emailAddress': event.request.userAttributes.email,
          ':forename': event.request.userAttributes.given_name,
          ':name': `${event.request.userAttributes.given_name} ${event.request.userAttributes.family_name}`,
          ':surname': event.request.userAttributes.family_name,
          ':twitterHandle': conditionalValue(event.request.userAttributes.twitter_handle),
          ':website': conditionalValue(event.request.userAttributes.website)
        },
        Key: {
          id: event.request.userAttributes.sub,
          lastUpdated: now.toISOString()
        },
        TableName,
        UpdateExpression: `
          SET emailAddress = :emailAddress,
          forename = :forename,
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
