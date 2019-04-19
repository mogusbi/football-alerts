import {APIGatewayProxyResult, Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import Axios, {AxiosResponse} from 'axios';
import Parser, {Output} from 'rss-parser';
import {URL} from 'url';
import {UserSettingsImport} from '../models';

const Bucket: string = process.env.BUCKET;
const parser: Parser = new Parser();
const s3: S3 = new S3();

export const handler: Handler = async (event: UserSettingsImport): Promise<APIGatewayProxyResult> => {
  try {
    const {data}: AxiosResponse = await Axios.get(event.import.feed);
    const output: Output = await parser.parseString(data);
    const now: Date = new Date();
    const {hostname}: URL = new URL(event.import.feed);
    const Key: string = `${hostname}-import-${now.toISOString()}.json`;

    await s3
      .putObject({
        Body: JSON.stringify(output),
        Bucket,
        Key
      })
      .promise();

    return {
      body: Key,
      statusCode: 200
    };
  } catch (e) {
    return {
      body: e.message,
      statusCode: 500
    };
  }
};
