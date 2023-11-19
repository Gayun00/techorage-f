export interface Article {
  id: string;
  title: string;
  text: string;
  keywords: string[];
  url: string;
  createdAt: Date;
}

export interface Keyword {
  id: string;
  keyword: string;
  count: number;
}
