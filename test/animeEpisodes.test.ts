import { HiAnime } from "aniwatch";
import { expect, test } from "vitest";

const animeId = "steinsgate-3";

// npx vitest run animeEpisodes.test.ts
test(`GET /api/v2/hianime/anime/${animeId}/episodes`, async () => {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.getEpisodes(animeId);

    expect(data.totalEpisodes).not.toEqual(0);
    expect(data.episodes).not.toEqual([]);
});
