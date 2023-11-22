import { type AnimeEpisode } from "../anime.js";

export interface ScrapedAnimeEpisodes {
  totalEpisodes: number;
  episodes: Array<AnimeEpisode>;
}
