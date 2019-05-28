import {Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {GetObjectOutput} from 'aws-sdk/clients/s3';
import Article from '../../models/Article';
import Import from '../../models/Import';
import Iterator from '../../models/Iterator';

const Bucket: string = process.env.BUCKET;
const TableName: string = process.env.TABLE_NAME;
const documentClient: DocumentClient = new DocumentClient();
const s3: S3 = new S3();

export const handler: Handler = async (event: Iterator<Import>): Promise<Iterator<Import>> => {
  const {Key}: Import = event.items[event.current];
  const {Body}: GetObjectOutput = await s3
    .getObject({
      Bucket,
      Key
    })
    .promise();
  const articles: Article[] = JSON.parse(<string>Body);
  const existingLinks: string[] = [];

  for (let {link} of articles) {
    const result: DocumentClient.QueryOutput = await documentClient
      .query({
        ExpressionAttributeValues: {
          ':link': link
        },
        IndexName: 'link-index',
        KeyConditionExpression: 'link = :link',
        TableName
      })
      .promise();

    if (result.Count > 0) {
      existingLinks.push(link);
    }
  }

  const filtered: Article[] = articles.filter(({link}: Article): boolean => !existingLinks.includes(link));

  await s3
    .putObject({
      Body: JSON.stringify(filtered),
      Bucket,
      Key
    })
    .promise();

  const current: number = event.current += 1;

  return {
    ...event,
    continue: event.current === event.count,
    current
  };
};
