hianimeRouter.get("/anime/schedule-ep/:animeId", async (c) => {
  const cacheConfig = c.get("CACHE_CONFIG");
  const animeId = decodeURIComponent(c.req.param("animeId").trim());
  
  const data = await cache.getOrSet(
    async () => {
      try {
        const { data } = await axios.get(`https://hianime.to/watch/${animeId}`);
        const $ = cheerio.load(data);
        const nextEpisodeSchedule = $(
          ".schedule-alert > .alert.small > span:last"
        ).attr("data-value");
        
        return { nextEpisodeSchedule };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    cacheConfig.key,
    cacheConfig.duration
  );
  
  return c.json({ success: true, data }, { status: 200 });
});
