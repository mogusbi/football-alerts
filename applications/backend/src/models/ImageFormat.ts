export interface IImagePutRequest {
  [name: string]: string;
}

export class ImageFormatSize {
  public height: number;
  public width: number;
}

export default class ImageFormat {
  public name: string;
  public value: ImageFormatSize;
}
