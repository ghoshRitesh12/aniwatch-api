import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

// npx vitest run animeAZList.test.ts
test("returns az list anime", async () => {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.getAZList("0-9", 1);

    expect(data.animes).not.toEqual([]);
});
