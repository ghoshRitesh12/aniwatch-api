export interface Anime {
  id: string | null;
  name: string | null;
  poster: string | null;
  duration: string | null;
  type: string | null;
  rating: string | null;
  episodes: {
    sub: number | null;
    dub: number | null;
  };
}

type CommonAnimeProps = "id" | "name" | "poster";

export interface Top10Anime extends Pick<Anime, CommonAnimeProps | "episodes"> {
  rank: number | null;
}

export type Top10AnimeTimePeriod = "day" | "week" | "month";

export interface MostPopularAnime
  extends Pick<Anime, CommonAnimeProps | "episodes" | "type"> {
  jname: string | null;
}

export interface SpotlightAnime
  extends MostPopularAnime,
    Pick<Top10Anime, "rank"> {
  description: string | null;
}

export interface TrendingAnime
  extends Pick<Anime, CommonAnimeProps>,
    Pick<Top10Anime, "rank"> {}

export interface LatestEpisodeAnime extends Anime {}

export interface TopUpcomingAnime extends Anime {}

export interface TopAiringAnime extends MostPopularAnime {}

export interface AnimeGeneralAboutInfo
  extends Pick<Anime, CommonAnimeProps>,
    Pick<SpotlightAnime, "description"> {
  stats: {
    quality: string | null;
  } & Pick<Anime, "duration" | "episodes" | "rating" | "type">;
}

export interface RecommendedAnime extends Anime {}

export interface RelatedAnime extends MostPopularAnime {}

export interface Season extends Pick<Anime, CommonAnimeProps> {
  isCurrent: boolean;
  title: string | null;
}

export interface AnimeSearchSuggestion
  extends Omit<MostPopularAnime, "episodes" | "type"> {
  moreInfo: Array<string>;
}

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
