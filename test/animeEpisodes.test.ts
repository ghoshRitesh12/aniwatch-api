import { expect, test } from "vitest";
import { scrapeAnimeEpisodes } from "../src/parsers/index.js";

test("returns episodes info of an anime", async () => {
  const data = await scrapeAnimeEpisodes("steinsgate-3");

  expect(data.totalEpisodes).not.toEqual(0);
  expect(data.episodes).not.toEqual([]);
});
