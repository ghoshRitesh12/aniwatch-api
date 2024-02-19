import axios from "axios";
import CryptoJS from "crypto-js";
import { substringAfter, substringBefore } from "../utils/index.js";
import type { Video, Subtitle, Intro } from "../types/extractor.js";

type extractReturn = {
  sources: Video[];
  subtitles: Subtitle[];
};

// https://megacloud.tv/embed-2/e-1/IxJ7GjGVCyml?k=1
class RapidCloud {
  private serverName = "RapidCloud";
  private sources: Video[] = [];

  // https://rapid-cloud.co/embed-6/eVZPDXwVfrY3?vast=1
  private readonly fallbackKey = "c1d17096f2ca11b7";
  private readonly host = "https://rapid-cloud.co";

  async extract(videoUrl: URL): Promise<extractReturn> {
    const result: extractReturn & { intro?: Intro; outro?: Intro } = {
      sources: [],
      subtitles: [],
    };

    try {
      const id = videoUrl.href.split("/").pop()?.split("?")[0];
      const options = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      };

      let res = null;

      res = await axios.get(
        `https://${videoUrl.hostname}/embed-2/ajax/e-1/getSources?id=${id}`,
        options
      );

      let {
        data: { sources, tracks, intro, outro, encrypted },
      } = res;

      let decryptKey = await (
        await axios.get(
          "https://raw.githubusercontent.com/cinemaxhq/keys/e1/key"
        )
      ).data;

      decryptKey = substringBefore(
        substringAfter(decryptKey, '"blob-code blob-code-inner js-file-line">'),
        "</td>"
      );

      if (!decryptKey) {
        decryptKey = await (
          await axios.get(
            "https://raw.githubusercontent.com/cinemaxhq/keys/e1/key"
          )
        ).data;
      }

      if (!decryptKey) decryptKey = this.fallbackKey;

      try {
        if (encrypted) {
          const sourcesArray = sources.split("");
          let extractedKey = "";
          let currentIndex = 0;

          for (const index of decryptKey) {
            const start = index[0] + currentIndex;
            const end = start + index[1];

            for (let i = start; i < end; i++) {
              extractedKey += res.data.sources[i];
              sourcesArray[i] = "";
            }
            currentIndex += index[1];
          }

          decryptKey = extractedKey;
          sources = sourcesArray.join("");

          const decrypt = CryptoJS.AES.decrypt(sources, decryptKey);
          sources = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
        }
      } catch (err: any) {
        console.log(err.message);
        throw new Error("Cannot decrypt sources. Perhaps the key is invalid.");
      }

      this.sources = sources?.map((s: any) => ({
        url: s.file,
        isM3U8: s.file.includes(".m3u8"),
      }));

      result.sources.push(...this.sources);

      if (videoUrl.href.includes(new URL(this.host).host)) {
        result.sources = [];
        this.sources = [];

        for (const source of sources) {
          const { data } = await axios.get(source.file, options);
          const m3u8data = data
            .split("\n")
            .filter(
              (line: string) =>
                line.includes(".m3u8") && line.includes("RESOLUTION=")
            );

          const secondHalf = m3u8data.map((line: string) =>
            line.match(/RESOLUTION=.*,(C)|URI=.*/g)?.map((s) => s.split("=")[1])
          );

          const TdArray = secondHalf.map((s: string[]) => {
            const f1 = s[0].split(",C")[0];
            const f2 = s[1].replace(/"/g, "");

            return [f1, f2];
          });

          for (const [f1, f2] of TdArray) {
            this.sources.push({
              url: `${source.file?.split("master.m3u8")[0]}${f2.replace(
                "iframes",
                "index"
              )}`,
              quality: f1.split("x")[1] + "p",
              isM3U8: f2.includes(".m3u8"),
            });
          }
          result.sources.push(...this.sources);
        }
      }

      result.intro =
        intro?.end > 1 ? { start: intro.start, end: intro.end } : undefined;
      result.outro =
        outro?.end > 1 ? { start: outro.start, end: outro.end } : undefined;

      result.sources.push({
        url: sources[0].file,
        isM3U8: sources[0].file.includes(".m3u8"),
        quality: "auto",
      });

      result.subtitles = tracks
        .map((s: any) =>
          s.file
            ? { url: s.file, lang: s.label ? s.label : "Thumbnails" }
            : null
        )
        .filter((s: any) => s);

      return result;
    } catch (err: any) {
      console.log(err.message);
      throw err;
    }
  }
}

export default RapidCloud;
