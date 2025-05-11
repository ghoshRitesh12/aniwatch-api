import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const genreName = "shounen";
const page = 2;

// npx vitest run animeGenre.test.ts
test(`GET /api/v2/hianime/genre/${genreName}?page=${page}`, async () => {
    const hianime = new HiAnime.Scraper();

    const data = await hianime.getGenreAnime(genreName, page);

    expect(data.animes).not.toEqual([]);
    expect(data.genres).not.toEqual([]);
    expect(data.topAiringAnimes).not.toEqual([]);
});
