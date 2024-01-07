import { expect, test } from "vitest";
import { scrapeHomePage } from "../src/parsers/index.js";

test("returns anime information present in homepage", async () => {
  const data = await scrapeHomePage();

  expect(data.spotlightAnimes).not.toEqual([]);
  expect(data.trendingAnimes).not.toEqual([]);
  expect(data.latestEpisodeAnimes).not.toEqual([]);
  expect(data.topUpcomingAnimes).not.toEqual([]);
  expect(data.topAiringAnimes).not.toEqual([]);
  expect(data.genres).not.toEqual([]);

  expect(data.top10Animes.today).not.toEqual([]);
  expect(data.top10Animes.week).not.toEqual([]);
  expect(data.top10Animes.month).not.toEqual([]);
});
