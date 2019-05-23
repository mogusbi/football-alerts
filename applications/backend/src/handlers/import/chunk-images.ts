import {Handler} from 'aws-lambda';
import {chunk} from 'lodash';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import ImageIterator from '../../models/ImageIterator';
import Iterator from '../../models/Iterator';

export const handler: Handler = async (event: ImageIterator): Promise<Iterator<DocumentClient.WriteRequest[]>> => {
  const items: DocumentClient.WriteRequest[][] = chunk(event.Images, 25);

  return {
    continue: false,
    count: items.length,
    current: 0,
    items
  };
};
