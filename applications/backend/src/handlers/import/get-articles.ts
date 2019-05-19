import {Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import Axios, {AxiosResponse} from 'axios';
import {parse} from 'himalaya';
import {get} from 'lodash';
import moment from 'moment';
import Parser, {Item, Output} from 'rss-parser';
import {URL} from 'url';
import Article from '../../models/Article';
import Iterator from '../../models/Iterator';
import Source from '../../models/Source';

const Bucket: string = process.env.BUCKET;
const s3: S3 = new S3();

export const handler: Handler = async (event: Iterator<Source>): Promise<Iterator<Source>> => {
  const source: Source = event.items[event.current];
  const parser: Parser = new Parser({
    customFields: {
      item: [
        [
          source.description,
          source.description
        ],
        [
          source.image.property,
          source.image.property
        ]
      ]
    }
  });
  const {data}: AxiosResponse = await Axios.get(source.feed);
  const output: Output = await parser.parseString(data);
  const now: Date = new Date();
  const {hostname}: URL = new URL(source.feed);
  const Key: string = `articles/${source.clubId}/${hostname}-import-${now.toISOString()}.json`;
  const articles: Article[] = output
    .items
    .map((item: Item) => ({
      clubId: source.clubId,
      description: parse(item[source.description]),
      imageId: get(item[source.image.property], source.image.value),
      link: item[source.link],
      publishDate: moment(item[source.publishDate]).toISOString(),
      rangeKey: null,
      sourceId: source.id,
      status: 'PENDING',
      title: item[source.title]
    }));

  await s3
    .putObject({
      Body: JSON.stringify(articles),
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
