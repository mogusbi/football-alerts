import {DocumentClient as Client} from 'aws-sdk/clients/dynamodb';

Client.prototype.update = jest.fn().mockReturnValue({
  promise: jest.fn()
});

export const DocumentClient: typeof Client = Client;
