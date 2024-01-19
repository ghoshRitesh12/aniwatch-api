import type {
  TrendingAnime,
  SpotlightAnime,
  TopAiringAnime,
  TopUpcomingAnime,
  LatestEpisodeAnime,
} from "../anime.js";
import type { HttpError } from "http-errors";
import type { ScrapedAnimeCategory } from "./animeCategory.js";

export interface ScrapedHomePage
  extends Pick<ScrapedAnimeCategory, "genres" | "top10Animes"> {
  spotlightAnimes: Array<SpotlightAnime> | HttpError;
  trendingAnimes: Array<TrendingAnime> | HttpError;
  latestEpisodeAnimes: Array<LatestEpisodeAnime> | HttpError;
  topUpcomingAnimes: Array<TopUpcomingAnime> | HttpError;
  topAiringAnimes: Array<TopAiringAnime> | HttpError;
}
