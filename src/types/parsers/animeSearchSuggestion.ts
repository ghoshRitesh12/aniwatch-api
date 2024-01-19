import type { HttpError } from "http-errors";
import type { AnimeSearchSuggestion } from "../anime.js";

export interface ScrapedAnimeSearchSuggestion {
  suggestions: Array<AnimeSearchSuggestion> | HttpError;
}
