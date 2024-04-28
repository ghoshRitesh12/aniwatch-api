import type { SubEpisode, DubEpisode, RawEpisode } from "../anime.js";

export interface ScrapedEpisodeServers {
  sub: SubEpisode[];
  dub: DubEpisode[];
  raw: RawEpisode[];
  episodeNo: number;
  episodeId: string;
}
