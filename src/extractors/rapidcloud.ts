import axios from "axios";
import { AES, enc as CryptojsEnc } from "crypto-js";
import { substringAfter, substringBefore } from "../utils";
import { Video, Subtitle, Intro } from "../models/extractor";

type extractReturn = { sources: Video[]; subtitles: Subtitle[] };

// https://megacloud.tv/embed-2/e-1/IxJ7GjGVCyml?k=1
class RapidCloud {
  private serverName = "RapidCloud";
  private sources: Video[] = [];

  // https://rapid-cloud.co/embed-6/eVZPDXwVfrY3?vast=1
  private readonly fallbackKey = "c1d17096f2ca11b7";
  private readonly host = "https://rapid-cloud.co";

  async extract(videoUrl: URL): Promise<extractReturn> {
    const result: extractReturn & { intro?: Intro } = {
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
        data: { sources, tracks, intro, encrypted },
      } = res;

      let decryptKey = await (
        await axios.get("https://github.com/enimax-anime/key/blob/e6/key.txt")
      ).data;

      decryptKey = substringBefore(
        substringAfter(decryptKey, '"blob-code blob-code-inner js-file-line">'),
        "</td>"
      );

      if (!decryptKey) {
        decryptKey = await (
          await axios.get(
            "https://raw.githubusercontent.com/enimax-anime/key/e6/key.txt"
          )
        ).data;
      }

      if (!decryptKey) decryptKey = this.fallbackKey;

      try {
        if (encrypted) {
          const sourcesArray = sources.split("");
          let extractedKey = "";

          for (const index of decryptKey) {
            for (let i = index[0]; i < index[1]; i++) {
              extractedKey += sources[i];
              sourcesArray[i] = "";
            }
          }

          decryptKey = extractedKey;
          sources = sourcesArray.join("");

          const decrypt = AES.decrypt(sources, decryptKey);
          sources = JSON.parse(decrypt.toString(CryptojsEnc.Utf8));
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
        if (intro.end > 1) {
          result.intro = {
            start: intro.start,
            end: intro.end,
          };
        }
      }

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
