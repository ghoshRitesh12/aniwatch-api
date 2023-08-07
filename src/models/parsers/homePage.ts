import { HttpError } from "http-errors";
import { ScrapedAnimeCategory } from "./animeCategory";
import {
  TrendingAnime,
  SpotlightAnime,
  TopAiringAnime,
  TopUpcomingAnime,
  LatestEpisodeAnime,
} from "../anime";

export interface ScrapedHomePage
  extends Pick<ScrapedAnimeCategory, "genres" | "top10Animes"> {
  spotlightAnimes: Array<SpotlightAnime> | HttpError;
  trendingAnimes: Array<TrendingAnime> | HttpError;
  latestEpisodeAnimes: Array<LatestEpisodeAnime> | HttpError;
  topUpcomingAnimes: Array<TopUpcomingAnime> | HttpError;
  topAiringAnimes: Array<TopAiringAnime> | HttpError;
}
