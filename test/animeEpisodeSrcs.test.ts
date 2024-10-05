import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const animeEpisodeId = "steinsgate-3?ep=230";
const server = "hd-1";
const category = "sub";

// npx vitest run animeEpisodeSrcs.test.ts
test(`GET /api/v2/hianime/episode/sources?animeEpisodeId=${animeEpisodeId}&server=${server}&category=${category}`, async () => {
  const hianime = new HiAnime.Scraper();
  const data = await hianime.getEpisodeSources(
    animeEpisodeId,
    server,
    category
  );

  expect(data.sources).not.toEqual([]);
});
