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
  images: any
  type: string;
  lead: string;
  duration: number;
  production: {
    name: string;
  },
  genres: {
    name: string;
  }[],
  countries: {
    name: string
  }[],
  persons: {
    DIRECTOR: {
      name: string;
    }[]
  },
  tags: {
    name: string;
  }[],
}