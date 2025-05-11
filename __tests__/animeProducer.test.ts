import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const producerName = "toei-animation";
const page = 2;

// npx vitest run animeProducer.test.ts
test(`GET /api/v2/hianime/producer/${producerName}?page=${page}`, async () => {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.getProducerAnimes(producerName, page);

    expect(data.animes).not.toEqual([]);
    expect(data.topAiringAnimes).not.toEqual([]);
    expect(data.top10Animes.today).not.toEqual([]);
    expect(data.top10Animes.week).not.toEqual([]);
    expect(data.top10Animes.month).not.toEqual([]);
});
