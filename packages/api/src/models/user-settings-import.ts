class Image {
  public attribute: string;
  public property: string;
  public test: string;
  public value: string;
}

class Import {
  public description: string;
  public feed: string;
  public image: Image;
  public link: string;
  public publishDate: string;
  public title: string;
}

export class UserSettingsImport {
  public import: Import;
}
