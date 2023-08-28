import type { SubEpisode, DubEpisode } from "../anime";

export interface ScrapedEpisodeServers {
  sub: SubEpisode[];
  dub: DubEpisode[];
  episodeNo: number;
  episodeId: string;
}
