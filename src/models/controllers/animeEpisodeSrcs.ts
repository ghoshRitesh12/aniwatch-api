import { AnimeServers } from "../anime";

export type AnimeEpisodeSrcsQueryParams = {
  id?: string;
  server?: AnimeServers;
  category?: "sub" | "dub";
};
