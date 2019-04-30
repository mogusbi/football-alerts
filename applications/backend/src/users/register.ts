import {CognitoUserPoolEvent, Handler} from 'aws-lambda';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import moment, {Moment} from 'moment';

const documentClient: DocumentClient = new DocumentClient();

function conditionalValue (input: string): string {
  if (input === undefined) {
    return null;
  }

  return input;
}

export const handler: Handler = async (event: CognitoUserPoolEvent): Promise<CognitoUserPoolEvent> => {
  const TableName: string = process.env.TABLE_NAME;

  switch (event.triggerSource) {
  case 'PostAuthentication_Authentication':
  case 'PostConfirmation_ConfirmSignUp':
    const now: Moment = moment.utc();

    await documentClient
      .update({
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ExpressionAttributeValues: {
          ':emailAddress': event.request.userAttributes.email,
          ':forename': event.request.userAttributes.given_name,
          ':lastUpdated': now.toISOString(),
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
          SET emailAddress = :emailAddress,
          forename = :forename,
          lastUpdated = :lastUpdated,
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
