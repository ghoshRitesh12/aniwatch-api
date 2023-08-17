export interface Video {
  url: string;
  quality?: string;
  isM3U8?: boolean;
  size?: number;
  [x: string]: unknown;
}

export interface Subtitle {
  id?: string;
  url: string;
  lang: string;
}

export interface Intro {
  start: number;
  end: number;
}
