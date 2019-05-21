import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import ImageFormat from './ImageFormat';
import Iterator from './Iterator';

export default class ImageIterator extends Iterator<string> {
  public formats: ImageFormat[];
  public Images: DocumentClient.WriteRequest[];
}
