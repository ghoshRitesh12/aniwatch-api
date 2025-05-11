import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

const padZero = (num: number) => (num < 10 ? `0${num}` : num.toString());

const d = new Date();
const date = `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(
    d.getDate()
)}`;

// npx vitest run estimatedSchedule.test.ts
test(`GET /api/v2/hianime/schedule?date=${date}`, async () => {
    const hianime = new HiAnime.Scraper();
    const data = await hianime.getEstimatedSchedule(date);

    expect(data.scheduledAnimes).not.toEqual([]);
});
