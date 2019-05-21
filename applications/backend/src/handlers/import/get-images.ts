import {Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {ListObjectsV2Output, Object} from 'aws-sdk/clients/s3';
import {basename, extname, join} from 'path';
import ImageFormat, {IImagePutRequest} from '../../models/ImageFormat';
import ImageIterator from '../../models/ImageIterator';

const Bucket: string = process.env.BUCKET;
const TableName: string = process.env.TABLE_NAME;
const documentClient: DocumentClient = new DocumentClient();
const s3: S3 = new S3();

export const handler: Handler = async (): Promise<ImageIterator> => {
  const {Contents}: ListObjectsV2Output = await s3
    .listObjectsV2({
      Bucket,
      Prefix: 'media/'
    })
    .promise();
  const items: string[] = Contents.map(({Key}: Object): string => Key);
  const {Items}: DocumentClient.ScanOutput = await documentClient
    .scan({
      ExpressionAttributeNames: {
        '#type': 'type'
      },
      ExpressionAttributeValues: {
        ':type': 'images'
      },
      FilterExpression: '#type = :type',
      TableName
    })
    .promise();
  const formats: ImageFormat[] = Items.map(({name, value}: DocumentClient.AttributeMap): ImageFormat => ({
    name,
    value
  }));
  const Images: DocumentClient.WriteRequest[] = items.map((file: string) => {
    const ext: string = extname(file);
    const id: string = basename(file, ext);
    const images: IImagePutRequest = formats.reduce((accumulator: IImagePutRequest, {name}: ImageFormat): IImagePutRequest => ({
      ...accumulator,
      [name]: join('/media/img', id, name + ext)
    }), {});

    return {
      PutRequest: {
        Item: {
          id,
          images
        }
      }
    };
  });

  return {
    Images,
    continue: items.length === 0,
    count: items.length,
    current: 0,
    formats,
    items
  };
};
