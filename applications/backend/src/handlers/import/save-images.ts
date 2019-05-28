import {Handler} from 'aws-lambda';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import Iterator from '../../models/Iterator';

const documentClient: DocumentClient = new DocumentClient();
const TableName: string = process.env.TABLE_NAME;

export const handler: Handler = async (event: Iterator<DocumentClient.WriteRequest[]>): Promise<
  Iterator<DocumentClient.WriteRequest[]>
> => {
  if (event.count === 0) {
    return {
      ...event,
      continue: true
    };
  }

  const batchWrite: DocumentClient.BatchWriteItemInput = {
    RequestItems: {}
  };

  batchWrite.RequestItems[TableName] = event.items[event.current];

  await documentClient
    .batchWrite(batchWrite)
    .promise();

  const current: number = event.current += 1;

  return {
    ...event,
    continue: event.current === event.count,
    current
  }
};
