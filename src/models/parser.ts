import { HttpError } from "http-errors";
import {
  Anime,
  Top10Anime,
  TrendingAnime,
  SpotlightAnime,
  TopAiringAnime,
  AnimeCategories,
  MostPopularAnime,
  TopUpcomingAnime,
  LatestEpisodeAnime,
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
