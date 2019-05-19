import {Handler} from 'aws-lambda';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import Iterator from '../../models/Iterator';
import Source from '../../models/Source';

const documentClient: DocumentClient = new DocumentClient();
const TableName: string = process.env.TABLE_NAME;

export const handler: Handler = async (): Promise<Iterator<Source>> => {
  const {Items}: DocumentClient.ScanOutput = await documentClient
    .scan({
      TableName
    })
    .promise();

  const items: Source[] = Items.map(({
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

  return {
    continue: false,
    count: items.length,
    current: 0,
    items
  };
};
