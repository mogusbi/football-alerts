import {Handler} from 'aws-lambda';
import {S3} from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {basename, extname, join} from 'path';
import sharp, {Sharp} from 'sharp';
import {PassThrough, Readable} from 'stream';
import ImageIterator from '../../models/ImageIterator';

const AssetBucket: string = process.env.ASSET_BUCKET;
const ImportBucket: string = process.env.IMPORT_BUCKET;
const s3: S3 = new S3();

export const handler: Handler = async (event: ImageIterator): Promise<ImageIterator> => {
  if (event.count === 0) {
    return {
      ...event,
      continue: true
    };
  }

  const file: string = event.items[event.current];
  const ext: string = extname(file);
  const clubId: string = file.split('/')[1];
  const id: string = basename(file, ext);
  const query: DocumentClient.WriteRequest = {
    PutRequest: {
      Item: {
        clubId,
        id,
        images: []
      }
    }
  };

  for (const format of event.formats) {
    const Key: string = join('public/media/img', id, format.name + ext);
    const height: number = parseInt(format.value.height, 10);
    const width: number = parseInt(format.value.width, 10);
    const resize: Sharp = await sharp()
      .resize(width, height)
      .toFormat('jpg');
    const Body: PassThrough = new PassThrough();
    const source: Readable = s3
      .getObject({
        Bucket: ImportBucket,
        Key: file
      })
      .createReadStream();

    source
      .pipe(resize)
      .pipe(Body);

    await s3
      .upload({
        Body,
        Bucket: AssetBucket,
        ContentType: 'image/jpeg',
        Key
      })
      .promise();

    query.PutRequest.Item.images.push({
      name: format.name,
      path: Key
    });
  }

  await s3
    .deleteObject({
      Bucket: ImportBucket,
      Key: file
    })
    .promise();

  event.Images.push(query);

  const current: number = event.current += 1;

  return {
    ...event,
    continue: event.current === event.count,
    current
  };
};
