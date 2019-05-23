import {Handler} from 'aws-lambda';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import ImageIterator from '../../models/ImageIterator';

const documentClient: DocumentClient = new DocumentClient();
const TableName: string = process.env.TABLE_NAME;

export const handler: Handler = async (event: ImageIterator): Promise<void> => {
  if (event.count > 0) {
    const batchWrite: DocumentClient.BatchWriteItemInput = {
      RequestItems: {}
    };

    batchWrite[TableName] = event.Images;

    await documentClient
      .batchWrite(batchWrite)
      .promise();
  }
};
