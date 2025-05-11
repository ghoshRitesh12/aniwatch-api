import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const category = "subbed-anime";

// npx vitest run animeCategory.test.ts
test(`GET /api/v2/hianime/category/${category}`, async () => {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.getCategoryAnime(category);

    expect(data.animes).not.toEqual([]);
    expect(data.genres).not.toEqual([]);
    expect(data.top10Animes.today).not.toEqual([]);
    expect(data.top10Animes.week).not.toEqual([]);
    expect(data.top10Animes.month).not.toEqual([]);
});
