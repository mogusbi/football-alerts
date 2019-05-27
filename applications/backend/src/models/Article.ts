export type ArticleStatus = 'PENDING' | 'PUBLISHED';

export default class Article {
  public clubId: string;
  public description: string;
  public imageId: string;
  public link: string;
  public publishDate: string;
  public sourceId: string;
  public status: ArticleStatus;
  public title: string;
}
