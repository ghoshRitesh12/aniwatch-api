import { AnimeEpisode } from "../anime";

export interface ScrapedAnimeEpisodes {
  totalEpisodes: number;
  episodes: Array<AnimeEpisode>;
}
