import {Callback, CognitoUserPoolEvent, Context} from 'aws-lambda';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {advanceTo, clear} from 'jest-date-mock';
import {handler} from '../register';

describe('register', (): void => {
  let callback: jest.Mock<Callback>;
  let context: Context;
  let event: CognitoUserPoolEvent;

  beforeAll((): void => {
    process.env.TABLE_NAME = 'USER_TABLE';

    advanceTo('2019-04-28');
  });

  beforeEach((): void => {
    callback = jest.fn();
    context = {
      awsRequestId: 'awsRequestId',
      callbackWaitsForEmptyEventLoop: false,
      done: (): jest.Mock => jest.fn(),
      fail: (): jest.Mock => jest.fn(),
      functionName: 'functionName',
      functionVersion: '1',
      getRemainingTimeInMillis: (): number => 0,
      invokedFunctionArn: 'invokedFunctionArn',
      logGroupName: '',
      logStreamName: '',
      memoryLimitInMB: 0,
      succeed: (): jest.Mock => jest.fn()
    };
    event = {
      callerContext: {
        awsSdkVersion: 'SDK-VERSION',
        clientId: 'CLIENT-ID'
      },
      region: 'eu-west-1',
      request: {
        userAttributes: {
          email: 'test@example.com',
          family_name: 'Example',
          given_name: 'Test',
          sub: 'USER-ID',
          website: 'https://mogusbi.co.uk'
        }
      },
      response: {},
      triggerSource: 'UserMigration_Authentication',
      userPoolId: 'eu-west-1_2sq18bIfD',
      version: 1,
    };
  });

  afterAll((): void => {
    clear();
  });

  describe('other trigger source', (): void => {
    it('should not insert into the database', async (): Promise<void> => {
      await handler(event, context, callback);

      expect(DocumentClient.prototype.update).not.toHaveBeenCalled();
    });

    it('should return event', async (): Promise<void> => {
      await expect(handler(event, context, callback)).resolves.toEqual(event);
    });
  });

  describe('PostAuthentication_Authentication trigger source', (): void => {
    beforeEach((): void => {
      event.triggerSource = 'PostAuthentication_Authentication';
    });

    it('should update with the correct params', async (): Promise<void> => {
      await handler(event, context, callback);

      expect(DocumentClient.prototype.update).toHaveBeenCalledWith({
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ExpressionAttributeValues: {
          ':emailAddress': 'test@example.com',
          ':forename': 'Test',
          ':lastUpdated': '2019-04-28T00:00:00.000Z',
          ':name': 'Test Example',
          ':surname': 'Example',
          ':twitterHandle': null,
          ':website': 'https://mogusbi.co.uk'
        },
        Key: {
          id: 'USER-ID'
        },
        TableName: 'USER_TABLE',
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
    });

    it('should return event', async (): Promise<void> => {
      await expect(handler(event, context, callback)).resolves.toEqual(event);
    });
  });

  describe('PostConfirmation_ConfirmSignUp trigger source', (): void => {
    beforeEach((): void => {
      event.triggerSource = 'PostConfirmation_ConfirmSignUp';
    });

    it('should update with the correct params', async (): Promise<void> => {
      await handler(event, context, callback);

      expect(DocumentClient.prototype.update).toHaveBeenCalledWith({
        ExpressionAttributeNames: {
          '#name': 'name'
        },
        ExpressionAttributeValues: {
          ':emailAddress': 'test@example.com',
          ':forename': 'Test',
          ':lastUpdated': '2019-04-28T00:00:00.000Z',
          ':name': 'Test Example',
          ':surname': 'Example',
          ':twitterHandle': null,
          ':website': 'https://mogusbi.co.uk'
        },
        Key: {
          id: 'USER-ID'
        },
        TableName: 'USER_TABLE',
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
    });

    it('should return event', async (): Promise<void> => {
      await expect(handler(event, context, callback)).resolves.toEqual(event);
    });
  });
});
