import { Router, IRouter } from "express";
import { getAnimeCategory, getAnimeSearch } from "../controllers";

const router: IRouter = Router();

// /anime/search?q=${query}&page=${page}
router.get("/search", getAnimeSearch);

// /anime/:category?page=${page}
router.get("/:category", getAnimeCategory);

export default router;
