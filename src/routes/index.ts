import { Router, IRouter } from "express";
import {
  getHomePage,
  getGenreAnime,
  getAnimeSearch,
  getAnimeCategory,
  getAnimeAboutInfo,
} from "../controllers";

const router: IRouter = Router();

// /anime
router.get("/", (_, res) => res.redirect("/"));

// /anime/home
router.get("/home", getHomePage);

// /anime/info?id=${anime-id}
router.get("/info", getAnimeAboutInfo);

// /anime/genre?name=${genreName}&page=${page}
router.get("/genre/:name", getGenreAnime);

// /anime/search?q=${query}&page=${page}
router.get("/search", getAnimeSearch);

// /anime/:category?page=${page}
router.get("/:category", getAnimeCategory);

export default router;
