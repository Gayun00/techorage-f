export interface Article {
  id: string;
  title: string;
  text: string;
  thumbnail: string;
  keywords: string[];
  url: string;
}

export interface Keyword {
  keyword: string;
  count: number;
}
