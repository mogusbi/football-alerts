import {APIGatewayProxyResult, Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import Axios, {AxiosResponse} from 'axios';
import {get} from 'lodash';
import Parser, {Item, Output} from 'rss-parser';
import {URL} from 'url';
import {Article, User, UserSettingsImport} from '../models';

const Bucket: string = process.env.BUCKET;
const s3: S3 = new S3();

export const handler: Handler = async ({id, settings}: User<UserSettingsImport>): Promise<APIGatewayProxyResult> => {
  try {
    const parser: Parser = new Parser({
      customFields: {
        item: [
          [settings.import.description, settings.import.description],
          [settings.import.image.property, settings.import.image.property]
        ]
      }
    });
    const {data}: AxiosResponse = await Axios.get(settings.import.feed);
    const output: Output = await parser.parseString(data);
    const now: Date = new Date();
    const {hostname}: URL = new URL(settings.import.feed);
    const Key: string = `${hostname}-import-${now.toISOString()}.json`;
    const body: string = JSON.stringify({
      Key,
      id
    });
    const articles: Article[] = output
      .items
      .map(
        (item: Item) => {
          return {
            description: item[settings.import.description],
            image: get(item[settings.import.image.property], settings.import.image.value),
            link: item[settings.import.link],
            publishDate: item[settings.import.publishDate],
            title: item[settings.import.title]
          };
        }
      );

    await s3
      .putObject({
        Body: JSON.stringify(articles),
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
