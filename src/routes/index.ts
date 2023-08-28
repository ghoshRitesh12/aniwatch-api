import { Router, IRouter } from "express";
import {
  getGenreAnime,
  getAnimeSearch,
  getHomePageInfo,
  getAnimeCategory,
  getAnimeEpisodes,
  getEpisodeServers,
  getProducerAnimes,
  getAnimeAboutInfo,
  getAnimeEpisodeSources,
  getAnimeSearchSuggestion,
} from "../controllers";

const router: IRouter = Router();

// /anime
router.get("/", (_, res) => res.redirect("/"));

// /anime/home
router.get("/home", getHomePageInfo);

// /anime/info?id=${anime-id}
router.get("/info", getAnimeAboutInfo);

// /anime/genre/${name}?page=${page}
router.get("/genre/:name", getGenreAnime);

// /anime/search?q=${query}&page=${page}
router.get("/search", getAnimeSearch);

// /anime/search/suggest?q=${query}
router.get("/search/suggest", getAnimeSearchSuggestion);

// /anime/episodes/${anime-id}
router.get("/episodes/:animeId", getAnimeEpisodes);

// /anime/servers?episodeId=${id}
router.get("/servers", getEpisodeServers);

// episodeId=steinsgate-3?ep=230
// /anime/episode-srcs?id=${episodeId}?server=${server}&category=${category (dub or sub)}
router.get("/episode-srcs", getAnimeEpisodeSources);

// /anime/producer/${name}?page=${page}
router.get("/producer/:name", getProducerAnimes);

// /anime/:category?page=${page}
router.get("/:category", getAnimeCategory);

export default router;
