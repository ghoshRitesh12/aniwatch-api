import { expect, test } from "vitest";
import { HiAnime } from "aniwatch";

function padZero(num: number) {
    return num < 10 ? `0${num}` : num.toString();
}

// npx vitest run nextEpisodeSchedule.test.ts
test("returns anime next episode schedule", async () => {
    const hianime = new HiAnime.Scraper();

    const d = new Date();
    const scheduleData = await hianime.getEstimatedSchedule(
        `${d.getFullYear()}-${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`
    );

    const animeId = scheduleData.scheduledAnimes[0].id!;
    const data = await hianime.getNextEpisodeSchedule(animeId);

    expect(data.airingISOTimestamp).not.toEqual(null);
    expect(data.airingTimestamp).not.toEqual(null);
    expect(data.secondsUntilAiring).not.toEqual(null);
});
