export class SourceImage {
  public array: boolean;
  public arrayIndex: number;
  public property: string;
  public value: string;
}

export default class Source {
  public clubId: string;
  public description: string;
  public feed: string;
  public id: string;
  public image: SourceImage;
  public link: string;
  public name: string;
  public publishDate: string;
  public title: string;
}
