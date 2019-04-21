import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {MakeRequestResult} from '../models';

const Bucket: string = process.env.BUCKET;
const s3: S3 = new S3();

export const handler: Handler = async ({body}: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const {Key}: MakeRequestResult = JSON.parse(body);

  await s3
    .deleteObject({
      Bucket,
      Key
    })
    .promise();

  return {
    body: 'success',
    statusCode: 200
  };
};
