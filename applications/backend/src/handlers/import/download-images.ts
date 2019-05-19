import {Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import Axios, {AxiosResponse} from 'axios';
import {extname} from 'path';
import {URL} from 'url';
import {v4} from 'uuid';
import Article from '../../models/Article';
import Import from '../../models/Import';
import Iterator from '../../models/Iterator';
import {GetObjectOutput} from 'aws-sdk/clients/s3';

const Bucket: string = process.env.BUCKET;
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
    for (const article of articles) {
      const {pathname}: URL = new URL(article.imageId);
      const extension: string = extname(pathname);
      const {data}: AxiosResponse = await Axios.get(article.imageId, {
        responseType: 'arraybuffer'
      });
      const imageId: string = v4();

      await s3
        .putObject({
          Body: new Buffer(data, 'binary'),
          Bucket,
          Key: `media/${article.clubId}/${imageId}${extension}`
        })
        .promise();

      article.imageId = imageId;
    }

    await s3
      .putObject({
        Body: JSON.stringify(articles),
        Bucket,
        Key
      })
      .promise();
  }

  const current: number = event.current += 1;

  return {
    ...event,
    continue: event.current === event.count,
    current
  };
};
