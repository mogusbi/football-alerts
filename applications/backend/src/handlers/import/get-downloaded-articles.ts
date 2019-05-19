import {Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {ListObjectsV2Output, Object} from 'aws-sdk/clients/s3';
import Import from '../../models/Import';
import Iterator from '../../models/Iterator';

const Bucket: string = process.env.BUCKET;
const s3: S3 = new S3();

export const handler: Handler = async (): Promise<Iterator<Import>> => {
  const {Contents}: ListObjectsV2Output = await s3
    .listObjectsV2({
      Bucket,
      Prefix: 'articles/'
    })
    .promise();

  const items: Import[] = Contents.map(({Key}: Object): Import => ({
    Key
  }));

  return {
    continue: false,
    count: items.length,
    current: 0,
    items
  };
};
