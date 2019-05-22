export interface IImagePutRequest {
  [name: string]: string;
}

export class ImageFormatSize {
  public height: string;
  public width: string;
}

export default class ImageFormat {
  public name: string;
  public value: ImageFormatSize;
}
