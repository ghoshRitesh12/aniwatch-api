import axios from "axios";
import { Video } from "../models/extractor";
import { USER_AGENT_HEADER } from "../utils";

class StreamSB {
  private serverName = "streamSB";
  private sources: Video[] = [];

  private readonly host = "https://watchsb.com/sources50";
  private readonly host2 = "https://streamsss.net/sources16";

  private PAYLOAD(hex: string): string {
    // `5363587530696d33443675687c7c${hex}7c7c433569475830474c497a65767c7c73747265616d7362`;
    return `566d337678566f743674494a7c7c${hex}7c7c346b6767586d6934774855537c7c73747265616d7362/6565417268755339773461447c7c346133383438333436313335376136323337373433383634376337633465366534393338373136643732373736343735373237613763376334363733353737303533366236333463353333363534366137633763373337343732363536313664373336327c7c6b586c3163614468645a47617c7c73747265616d7362`;
  }

  async extract(videoUrl: URL, isAlt: boolean = false): Promise<Video[]> {
    let headers: Record<string, string> = {
      watchsb: "sbstream",
      Referer: videoUrl.href,
      "User-Agent": USER_AGENT_HEADER,
    };
    let id = videoUrl.href.split("/e/").pop();
    if (id?.includes("html")) {
      id = id.split(".html")[0];
    }
    const bytes = new TextEncoder().encode(id);

    const res = await axios
      .get(
        `${isAlt ? this.host2 : this.host}/${this.PAYLOAD(
          Buffer.from(bytes).toString("hex")
        )}`,
        { headers }
      )
      .catch(() => null);

    if (!res?.data.stream_data) {
      throw new Error("No source found. Try a different server");
    }

    headers = {
      "User-Agent": USER_AGENT_HEADER,
      Referer: videoUrl.href.split("e/")[0],
    };

    const m3u8_urls = await axios.get(res.data.stream_data.file, {
      headers,
    });

    const videoList = m3u8_urls?.data?.split("#EXT-X-STREAM-INF:") ?? [];

    for (const video of videoList) {
      if (!video.includes("m3u8")) continue;

      const url = video.split("\n")[1];
      const quality = video.split("RESOLUTION=")[1].split(",")[0].split("x")[1];

      this.sources.push({
        url: url,
        quality: `${quality}p`,
        isM3U8: true,
      });
    }

    this.sources.push({
      url: res.data.stream_data.file,
      quality: "auto",
      isM3U8: res.data.stream_data.file.includes(".m3u8"),
    });

    return this.sources;
  }

  private addSources(source: any): void {
    this.sources.push({
      url: source.file,
      isM3U8: source.file.includes(".m3u8"),
    });
  }
}

export default StreamSB;
