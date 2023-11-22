import { type AnimeServers } from "../anime.js";

export type AnimeEpisodeSrcsQueryParams = {
  id?: string;
  server?: AnimeServers;
  category?: "sub" | "dub";
};
