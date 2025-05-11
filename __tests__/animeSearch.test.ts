import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const query = "monster";
const page = 1;
const filter: HiAnime.SearchFilters = {
    genres: "seinen,psychological",
};

// npx vitest run animeSearch.test.ts
test(`GET /api/v2/hianime/search?q=${query}&page=${page}&genres=${filter.genres}`, async () => {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.search(query, page, filter);

    expect(data.animes).not.toEqual([]);
    expect(data.mostPopularAnimes).not.toEqual([]);
});
