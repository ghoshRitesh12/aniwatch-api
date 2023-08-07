import { scrapeAnimeAboutInfo } from "../src/parsers";

test("returns information about an anime", async () => {
  const data = await scrapeAnimeAboutInfo("steinsgate-3");

  expect(data.anime.info.name).not.toEqual(null);
  expect(data.recommendedAnimes).not.toEqual([]);
  expect(data.mostPopularAnimes).not.toEqual([]);
  expect(Object.keys(data.anime.moreInfo)).not.toEqual([]);
});
