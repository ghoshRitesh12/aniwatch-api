import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const animeEpisodeId = "steinsgate-0-92?ep=2055";

// npx vitest run episodeServers.test.ts
test(`GET /api/v2/hianime/episode/servers?animeEpisodeId=${animeEpisodeId}`, async () => {
  const hianime = new HiAnime.Scraper();
  const data = await hianime.getEpisodeServers(animeEpisodeId);

  expect(data.episodeId).not.toEqual(null);
  expect(data.episodeNo).not.toEqual(0);
  expect(data.sub).not.toEqual([]);
  expect(data.dub).not.toEqual([]);
});
