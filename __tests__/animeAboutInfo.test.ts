import { HiAnime } from "aniwatch";
import { expect, test } from "vitest";

const animeId = "steinsgate-3";

// npx vitest run animeAboutInfo.test.ts
test(`GET /api/v2/hianime/anime/${animeId}`, async () => {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.getInfo(animeId);

    expect(data.anime.info.name).not.toEqual(null);
    expect(data.recommendedAnimes).not.toEqual([]);
    expect(data.mostPopularAnimes).not.toEqual([]);
    expect(Object.keys(data.anime.moreInfo)).not.toEqual([]);
});
