export interface SectionData {
  id: number;
  webUrl: string;
  title: string;
  elements: MovieData[]
}

export interface MovieData {
  id: number;
  item: MovieDataItem;
}

export interface MovieDataItem {
  id: number;
  title: string;
  trailer: boolean;
  webUrl: string;
  year: number;
}