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
  anilistId: number | null;
  malId: number | null;
  stats: {
    quality: string | null;
  } & Pick<Anime, "duration" | "episodes" | "rating" | "type">;
  promotionalVideos: AnimePromotionalVideo[];
  charactersVoiceActors: AnimeCharactersAndVoiceActors[];
}

export interface RecommendedAnime extends Anime {}

export interface RelatedAnime extends MostPopularAnime {}

export interface Season extends Pick<Anime, CommonAnimeProps> {
  isCurrent: boolean;
  title: string | null;
}

export interface AnimePromotionalVideo {
  title: string | undefined;
  source: string | undefined;
  thumbnail: string | undefined;
}

export interface AnimeCharactersAndVoiceActors {
  character: AnimeCharacter;
  voiceActor: AnimeCharacter;
}

export interface AnimeCharacter {
  id: string;
  poster: string;
  name: string;
  cast: string;
}

export interface AnimeSearchSuggestion
  extends Omit<MostPopularAnime, "episodes" | "type"> {
  moreInfo: Array<string>;
}

export interface AnimeEpisode extends Pick<Season, "title"> {
  episodeId: string | null;
  number: number;
  isFiller: boolean;
}

export interface SubEpisode {
  serverName: string;
  serverId: number | null;
}
export interface DubEpisode extends SubEpisode {}
export interface RawEpisode extends SubEpisode {}

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

export type AnimeServers =
  | "vidstreaming"
  | "megacloud"
  | "streamsb"
  | "streamtape"
  | "vidcloud";

export enum Servers {
  VidStreaming = "vidstreaming",
  MegaCloud = "megacloud",
  StreamSB = "streamsb",
  StreamTape = "streamtape",
  VidCloud = "vidcloud",
  AsianLoad = "asianload",
  GogoCDN = "gogocdn",
  MixDrop = "mixdrop",
  UpCloud = "upcloud",
  VizCloud = "vizcloud",
  MyCloud = "mycloud",
  Filemoon = "filemoon",
}
