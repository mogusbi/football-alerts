import {Handler} from 'aws-lambda';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import Source from '../../models/Source';

const documentClient: DocumentClient = new DocumentClient();
const TableName: string = process.env.TABLE_NAME;

export const handler: Handler = async (): Promise<Source[]> => {
  const {Items}: DocumentClient.ScanOutput = await documentClient
    .scan({
      TableName
    })
    .promise();

  return Items.map(({
    clubId,
    description,
    feed,
    id,
    image,
    link,
    name,
    publishDate,
    title
  }: DocumentClient.AttributeMap): Source => ({
    clubId,
    description,
    feed,
    id,
    image,
    link,
    name,
    publishDate,
    title
  }));
};
