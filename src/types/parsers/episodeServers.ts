import type { SubEpisode, DubEpisode } from "../anime.js";

export interface ScrapedEpisodeServers {
  sub: SubEpisode[];
  dub: DubEpisode[];
  episodeNo: number;
  episodeId: string;
}
