import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const query = "one piece";

// npx vitest run animeSearchSuggestion.test.ts
test(`GET /api/v2/hianime/search/suggestion?q=${query}`, async () => {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.searchSuggestions(query);

    expect(data.suggestions).not.toEqual([]);
});
