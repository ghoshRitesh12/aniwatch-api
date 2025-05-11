import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const animeId = "one-piece-100";

// npx vitest run animeQtip.test.ts
test(`returns ${animeId} anime qtip info`, async () => {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.getQtipInfo(animeId);

    expect(data.anime.id).not.toEqual(null);
    expect(data.anime.name).not.toEqual(null);
    expect(data.anime.description).not.toEqual(null);
    expect(data.anime.genres).not.toEqual([]);
});
