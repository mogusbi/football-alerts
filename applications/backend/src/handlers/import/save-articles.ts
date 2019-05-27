import {Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {GetObjectOutput} from 'aws-sdk/clients/s3';
import moment, {Moment} from 'moment';
import {v4} from 'uuid';
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

  if (articles.length > 0) {
    const now: Moment = moment.utc();
    const batchWrite: DocumentClient.BatchWriteItemInput = {
      RequestItems: {}
    };

    batchWrite.RequestItems[TableName] = articles.map((article: Article): DocumentClient.WriteRequest => ({
      PutRequest: {
        Item: {
          ...article,
          createdAt: now.toISOString(),
          id: v4(),
          rangeKey: `${moment(article.publishDate).unix()}::${article.status}::${article.sourceId}::${article.clubId}`,
          updatedAt: now.toISOString()
        }
      }
    }));

    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(batchWrite));

    await documentClient
      .batchWrite(batchWrite)
      .promise();
  }

  const current: number = event.current += 1;

  return  {
    ...event,
    continue: event.current === event.count,
    current
  };
};
