export interface Anime {
  id: string | null;
  name: string | null;
  poster: string | null;
  duration: string | null;
  type: string | null;
  rating: string | null;
  episodes: string | null;
}

type CommonAnimeProps = "id" | "name" | "poster";

export interface Top10Anime extends Pick<Anime, CommonAnimeProps> {
  rank: number | null;
  eps: {
    sub: number | null;
    dub: number | null;
  };
}

export type Top10AnimeTimePeriod = "day" | "week" | "month";

export type AnimeCategories =
  | "most-favorite"
  | "most-popular"
  | "subbed-anime"
  | "dubbed-anime"
  | "recently-updated"
  | "recently-added"
  | "top-upcoming"
  | "top-airing"
  | "movie"
  | "special"
  | "ova"
  | "ona"
  | "tv"
  | "completed";

export enum Servers {
  AsianLoad = "asianload",
  GogoCDN = "gogocdn",
  StreamSB = "streamsb",
  MixDrop = "mixdrop",
  UpCloud = "upcloud",
  VidCloud = "vidcloud",
  StreamTape = "streamtape",
  VizCloud = "vizcloud",
  MyCloud = "mycloud",
  Filemoon = "filemoon",
  VidStreaming = "vidstreaming",
}
