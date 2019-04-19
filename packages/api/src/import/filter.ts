import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {GetObjectOutput} from 'aws-sdk/clients/s3';
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
    const Keys: DocumentClient.KeyList = articles.map(
      ({link}: Article): DocumentClient.Key => ({
        link
      })
    );
    const batchGet: DocumentClient.BatchGetItemInput = {
      RequestItems: {}
    };

    batchGet.RequestItems[TableName] = {
      Keys
    };

    const {Responses}: DocumentClient.BatchGetItemOutput = await documentClient
      .batchGet(batchGet)
      .promise();
    const existingLinks: string[] = Responses[TableName].map(
      ({link}: Article): string => link
    );
    const filtered: Article[] = articles.filter(
      ({link}: Article): boolean => !existingLinks.includes(link)
    );

    await s3
      .putObject({
        Body: JSON.stringify(filtered),
        Bucket,
        Key
      })
      .promise();

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
