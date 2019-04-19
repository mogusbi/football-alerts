import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {GetObjectOutput} from 'aws-sdk/clients/s3';
import {v4} from 'uuid';
import {Article, MakeRequestResult} from '../models';

const Bucket: string = process.env.BUCKET;
const TableName: string = process.env.TABLE_NAME;
const documentClient: DocumentClient = new DocumentClient();
const s3: S3 = new S3();

export const handler: Handler = async ({body}: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    const {Key}: MakeRequestResult = JSON.parse(body);
    const {Body}: GetObjectOutput = await s3
      .getObject({
        Bucket,
        Key
      })
      .promise();
    const articles: Article[] = JSON.parse(<string>Body);

    if (articles.length > 0) {
      const batchWrite: DocumentClient.BatchWriteItemInput = {
        RequestItems: {}
      };

      batchWrite.RequestItems[TableName] = articles.map(
        (article: Article): DocumentClient.WriteRequest => ({
          PutRequest: {
            Item: {
              ...article,
              id: v4()
            }
          }
        })
      );

      await documentClient
        .batchWrite(batchWrite)
        .promise();
    }

    return {
      body,
      statusCode: 200
    };
  } catch (e) {
    return {
      body: e.message,
      statusCode: 500
    };
  }
};
