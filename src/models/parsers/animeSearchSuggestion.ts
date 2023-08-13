import { HttpError } from "http-errors";
import { AnimeSearchSuggestion } from "../anime";

export interface ScrapedAnimeSearchSuggestion {
  suggestions: Array<AnimeSearchSuggestion> | HttpError;
}
