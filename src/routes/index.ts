import { Router, IRouter } from "express";
import {
  getGenreAnime,
  getAnimeSearch,
  getHomePageInfo,
  getAnimeCategory,
  getProducerAnimes,
  getAnimeAboutInfo,
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

// /anime/producer/${name}?page=${page}
router.get("/producer/:name", getProducerAnimes);

// /anime/:category?page=${page}
router.get("/:category", getAnimeCategory);

export default router;
