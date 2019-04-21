import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {GetObjectOutput} from 'aws-sdk/clients/s3';
import Axios, {AxiosResponse} from 'axios';
import {extname} from 'path';
import {URL} from 'url';
import {v4} from 'uuid';
import {Article, MakeRequestResult} from '../models';

const Bucket: string = process.env.BUCKET;
const s3: S3 = new S3();

export const handler: Handler = async ({body}: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const {Key}: MakeRequestResult = JSON.parse(body);
  const {Body}: GetObjectOutput = await s3
    .getObject({
      Bucket,
      Key
    })
    .promise();
  const articles: Article[] = JSON.parse(<string>Body);

  if (articles.length > 0) {
    for (const article of articles) {
      const url: URL = new URL(article.image);
      const extension: string = extname(url.pathname);
      const {data}: AxiosResponse = await Axios.get(article.image, {
        responseType: 'arraybuffer'
      });
      const image: string = v4();

      await s3
        .putObject({
          Body: new Buffer(data, 'binary'),
          Bucket,
          Key: `media/${image}${extension}`
        })
        .promise();

      article.image = image;
    }

    await s3
      .putObject({
        Body: JSON.stringify(articles),
        Bucket,
        Key
      })
      .promise();
  }

  return {
    body,
    statusCode: 200
  };
};
