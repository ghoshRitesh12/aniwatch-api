import { Router, IRouter } from "express";
import { getAnimeCategory } from "../controllers";

const router: IRouter = Router();

// /anime/:category?page=${page}
router.get("/:category", getAnimeCategory);

export default router;
