import { HttpError } from "http-errors";
import {
  Anime,
  Season,
  Top10Anime,
  RelatedAnime,
  TrendingAnime,
  SpotlightAnime,
  TopAiringAnime,
  AnimeCategories,
  MostPopularAnime,
  TopUpcomingAnime,
  RecommendedAnime,
  LatestEpisodeAnime,
  AnimeGeneralAboutInfo,
} from "./anime";

export interface ScrapedAnimeCategory {
  animes: Array<Anime> | HttpError;
  genres: Array<string>;
  top10Animes: {
    today: Array<Top10Anime> | HttpError;
    week: Array<Top10Anime> | HttpError;
    month: Array<Top10Anime> | HttpError;
  };
  category: AnimeCategories;
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

type CommonAnimeScrapeTypes =
  | "animes"
  | "totalPages"
  | "hasNextPage"
  | "currentPage";

export interface ScrapedAnimeSearchResult
  extends Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes> {
  mostPopularAnimes: Array<MostPopularAnime> | HttpError;
}

export interface ScrapedHomePage
  extends Pick<ScrapedAnimeCategory, "genres" | "top10Animes"> {
  spotlightAnimes: Array<SpotlightAnime> | HttpError;
  trendingAnimes: Array<TrendingAnime> | HttpError;
  latestEpisodeAnimes: Array<LatestEpisodeAnime> | HttpError;
  topUpcomingAnimes: Array<TopUpcomingAnime> | HttpError;
  topAiringAnimes: Array<TopAiringAnime> | HttpError;
}

export interface ScrapedAnimeAboutInfo
  extends Pick<ScrapedAnimeSearchResult, "mostPopularAnimes"> {
  anime: {
    info: AnimeGeneralAboutInfo;
    moreInfo: Record<string, string | string[]>;
  };
  seasons: Array<Season>;
  relatedAnimes: Array<RelatedAnime> | HttpError;
  recommendedAnimes: Array<RecommendedAnime> | HttpError;
}

export interface ScrapedGenreAnime
  extends Pick<ScrapedAnimeCategory, CommonAnimeScrapeTypes | "genres">,
    Pick<ScrapedHomePage, "topAiringAnimes"> {
  genreName: string;
}
