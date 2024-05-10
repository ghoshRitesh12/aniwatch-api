<p align="center">
  <a href="https://github.com/ghoshRitesh12/aniwatch-api">
    <img 
      src="https://github.com/ghoshRitesh12/aniwatch-api/blob/main/public/img/img1.gif?raw=true" 
      alt="Logo" 
      width="120" 
      height="120"
      decoding="async"
      fetchpriority="high"
    />
  </a>
</p>

# <p align="center">Aniwatch API</p>

  <p align="center">
    A free restful API serving anime information from <a href="https://hianime.to" target="_blank">hianime.to</a>
    <br/><br/>
    <strong>
      <a 
        href="https://github.com/ghoshRitesh12/aniwatch-api/issues/new?assignees=ghoshRitesh12&labels=bug&template=bug-report.yml"
      > 
        Bug report
      </a>
      ·
      <a 
        href="https://github.com/ghoshRitesh12/aniwatch-api/issues/new?assignees=ghoshRitesh12&labels=enhancement&template=feature-request.md"
      >
        Feature request
      </a>
    </strong>
  </p>
  <p align="center">
    <a 
      href="https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/codeql-analysis.yml"
    >
      <img 
        src="https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/codeql-analysis.yml/badge.svg" 
        alt="codeql"
      />
    </a>
    <a 
      href="https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/docker-build.yml"
    >
      <img 
        src="https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/docker-build.yml/badge.svg" 
        alt="docker-build"
      />
    </a>
    <a 
      href="https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/test.yml"
    >
      <img 
        src="https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/test.yml/badge.svg" alt="test coverage"
      >
    </a>
    <a 
      href="https://github.com/ghoshRitesh12/aniwatch-api/stargazers"
    >
      <img 
        src="https://img.shields.io/github/stars/ghoshRitesh12/aniwatch-api" alt="stars"
      >
    </a>
    <a 
      href="https://github.com/ghoshRitesh12/aniwatch-api/network/members"
    >
      <img 
        src="https://img.shields.io/github/forks/ghoshRitesh12/aniwatch-api" alt="forks"
      >
    </a>
    <a 
      href="https://github.com/consumet/extensions/blob/master/LICENSE"
    >
      <img 
        src="https://img.shields.io/github/license/ghoshRitesh12/aniwatch-api" alt="GitHub"
      />
    </a>
  </p>
</p>

> [!IMPORTANT]
>
> 1. [https://api-aniwatch.onrender.com](https://api-aniwatch.onrender.com/) is only meant to demo the API and has rate-limiting enabled to minimise bandwidth consumption. It is recommended to deploy your own instance for personal use by customizing the api as you need it to be.
> 2. This API is just an unofficial api for [hianime.to](https://hianime.to) and is in no other way officially related to the same.
> 3. The content that this api provides is not mine, nor is it hosted by me. These belong to their respective owners. This api just demonstrates how to build an api that scrapes websites and uses their content.

## Table of Contents

- [Installation](#installation)
  - [Local](#local)
  - [Docker](#docker)
- [Host your instance](#-host-your-instance)
  - [Vercel](#vercel)
  - [Render](#render)
- [Documentation](#documentation)
  - [GET Anime Home Page](#get-anime-home-page)
  - [GET Anime About Info](#get-anime-about-info)
  - [GET Search Results](#get-search-results)
  - [GET Search Suggestions](#get-search-suggestions)
  - [GET Producer Animes](#get-producer-animes)
  - [GET Genre Animes](#get-genre-animes)
  - [GET Category Anime](#get-category-anime)
  - [GET Estimated Schedules](#get-estimated-schedules)
  - [GET Anime Episodes](#get-anime-episodes)
  - [GET Anime Episode Servers](#get-anime-episode-servers)
  - [GET Anime Episode Streaming Links](#get-anime-episode-streaming-links)
- [Development](#development)
- [Support](#support)
- [Thanks](#thanks)
- [License](#license)
- [Star History](#star-history)

## <span id="installation">💻 Installation</span>

### Local

1. Clone the repository and move into the directory.

   ```bash
   git clone https://github.com/ghoshRitesh12/aniwatch-api.git
   cd aniwatch-api
   ```

2. Install all the dependencies.

   ```bash
   npm i #or yarn install or pnpm i
   ```

3. Start the server!

   ```bash
   npm start #or yarn start or pnpm start
   ```

   Now the server should be running on [http://localhost:4000](http://localhost:4000)

### Docker

Docker image is available at [GitHub Container Registry](https://github.com/ghoshRitesh12/aniwatch-api/pkgs/container/aniwatch).

Run the following commands to pull and run the docker image.

```bash
docker pull ghcr.io/ghoshritesh12/aniwatch
docker run -p 4000:4000 ghcr.io/ghoshritesh12/aniwatch
```

The above command will start the server on port 4000. You can access the server at [http://localhost:4000](http://localhost:4000) and you can also change the port by changing the `-p` option to `-p <port>:4000`.

You can also add the `-d` flag to run the container in detached mode.

## <span id="host-your-instance">⛅ Host your instance</span>

> [!CAUTION]
>
> For personal deployments, **refrain from having an env** named `ANIWATCH_API_HOSTNAME`. You may face rate limitting and other issues if you do.

### Vercel

Deploy your own instance of Aniwatch API on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ghoshRitesh12/aniwatch-api)

> [!NOTE]
>
> When deploying to vercel, set an env named `IS_VERCEL_DEPLOYMENT` to `true` or anything, but this env should be present.

### Render

Deploy your own instance of Aniwatch API on Render.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ghoshRitesh12/aniwatch-api)

## <span id="documentation">📚 Documentation</span>

The endpoints exposed by the api are listed below with examples that uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), but you can use any http library.

### `GET` Anime Home Page

#### Endpoint

```bash
https://api-aniwatch.onrender.com/anime/home
```

#### Request sample

```javascript
const resp = await fetch("https://api-aniwatch.onrender.com/anime/home");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  genres: ["Action", "Cars", "Adventure", ...],
  latestEpisodeAnimes: [
    {
      id: string,
      name: string,
      poster: string,
      duration: string,
      type: string,
      rating: string,
      episodes: {
        sub: number,
        dub: number,
      }
    },
    {...},
  ],
  spotlightAnimes: [
    {
      id: string,
      name: string,
      jname: string,
      poster: string,
      description: string,
      rank: number,
      otherInfo: string[],
      episodes: {
        sub: number,
        dub: number,
      },
    },
    {...},
  ],
  top10Animes: {
    today: [
      {
        episodes: {
          sub: number,
          dub: number,
        },
        id: string,
        name: string,
        poster: string,
        rank: number
      },
      {...},
    ],
    month: [...],
    week: [...]
  },
  topAiringAnimes: [
    {
      id: string,
      name: string,
      jname: string,
      poster: string,
    },
    {...},
  ],
  topUpcomingAnimes: [
    {
      id: string,
      name: string,
      poster: string,
      duration: string,
      type: string,
      rating: string,
      episodes: {
        sub: number,
        dub: number,
      }
    },
    {...},
  ],
  trendingAnimes: [
    {
      id: string,
      name: string,
      poster: string,
      rank: number,
    },
    {...},
  ],
}

```

[🔼 Back to Top](#table-of-contents)

### `GET` Anime About Info

#### Endpoint

```sh
https://api-aniwatch.onrender.com/anime/info?id={anime-id}
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|   `id`    | string | The unique anime id (in kebab case). |    Yes    |   --    |

#### Request sample

```javascript
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/info?id=attack-on-titan-112"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  anime: [
    info: {
      id: string,
      name: string,
      poster: string,
      description: string,
      stats: {
        rating: string,
        quality: string,
        episodes: {
          sub: number,
          dub: number
        },
        type: string,
        duration: string
      },
      promotionalVideos: [
        {
          title: string | undefined,
          source: string | undefined,
          thumbnail: string | undefined
        },
        {...},
      ],
      characterVoiceActor: [
        {
          character: {
            id: string,
            poster: string,
            name: string,
            cast: string
          },
          voiceActor: {
            id: string,
            poster: string,
            name: string,
            cast: string
          }
        },
        {...},
      ]
    }
    moreInfo: {
      aired: string,
      genres: ["Action", "Mystery", ...],
      status: string,
      studios: string,
      duration: string
      ...
    }
  ],
  mostPopularAnimes: [
    {
      episodes: {
        sub: number,
        dub: number,
      },
      id: string,
      jname: string,
      name: string,
      poster: string,
      type: string
    },
    {...},
  ],
  recommendedAnimes: [
    {
      id: string,
      name: string,
      poster: string,
      duration: string,
      type: string,
      rating: string,
      episodes: {
        sub: number,
        dub: number,
      }
    },
    {...},
  ],
  relatedAnimes: [
    {
      id: string,
      name: string,
      poster: string,
      duration: string,
      type: string,
      rating: string,
      episodes: {
        sub: number,
        dub: number,
      }
    },
    {...},
  ],
  seasons: [
    {
      id: string,
      name: string,
      title: string,
      poster: string,
      isCurrent: boolean
    },
    {...}
  ]
}
```

[🔼 Back to Top](#table-of-contents)

### `GET` Search Results

#### Endpoint

```sh
# basic example
https://api-aniwatch.onrender.com/anime/search?q={query}&page={page}

# advanced example
https://api-aniwatch.onrender.com/anime/search?q={query}&genres={genres}&type={type}&sort={sort}&season={season}&language={sub_or_dub}&status={status}&rated={rating}&start_date={yyyy-mm-dd}&end_date={yyyy-mm-dd}&score={score}
```

#### Query Parameters

|  Parameter   |  Type  |                            Description                            | Required? | Default |
| :----------: | :----: | :---------------------------------------------------------------: | :-------: | :-----: |
|     `q`      | string | The search query, i.e. the title of the item you are looking for. |    Yes    |   --    |
|    `page`    | number |                  The page number of the result.                   |    No     |   `1`   |
|    `type`    | string |                  Type of the anime. eg: `movie`                   |    No     |   --    |
|   `status`   | string |            Status of the anime. eg: `finished-airing`             |    No     |   --    |
|   `rated`    | string |             Rating of the anime. eg: `r+` or `pg-13`              |    No     |   --    |
|   `score`    | string |           Score of the anime. eg: `good` or `very-good`           |    No     |   --    |
|   `season`   | string |              Season of the aired anime. eg: `spring`              |    No     |   --    |
|  `language`  | string |     Language category of the anime. eg: `sub` or `sub-&-dub`      |    No     |   --    |
| `start_date` | string |       Start date of the anime(yyyy-mm-dd). eg: `2014-10-2`        |    No     |   --    |
|  `end_date`  | string |        End date of the anime(yyyy-mm-dd). eg: `2010-12-4`         |    No     |   --    |
|    `sort`    | string |      Order of sorting the anime result. eg: `recently-added`      |    No     |   --    |
|   `genres`   | string |   Genre of the anime, separated by commas. eg: `isekai,shounen`   |    No     |   --    |

> [!TIP]
> For both `start_date` and `end_date`, year must be mentioned. If you wanna omit date or month specify `0` instead.
> Eg: omitting date -> 2014-10-0, omitting month -> 2014-0-12, omitting both -> 2014-0-0

#### Request sample

```javascript
// basic example
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/search?q=titan&page=1"
);
const data = await resp.json();
console.log(data);

// advanced example
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/search?q=girls&genres=action,adventure&type=movie&sort=score&season=spring&language=dub&status=finished-airing&rated=pg-13&start_date=2014-0-0&score=good"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  animes: [
    {
      id: string,
      name: string,
      poster: string,
      duration: string,
      type: string,
      rating: string,
      episodes: {
        sub: number,
        dub: number,
      }
    },
    {...},
  ],
  mostPopularAnimes: [
    {
      episodes: {
        sub: number,
        dub: number,
      },
      id: string,
      jname: string,
      name: string,
      poster: string,
      type: string
    },
    {...},
  ],
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  searchQuery: string,
  searchFilters: {
    [filter_name]: [filter_value]
    ...
  }
}
```

[🔼 Back to Top](#table-of-contents)

### `GET` Search Suggestions

#### Endpoint

```sh
https://api-aniwatch.onrender.com/anime/search/suggest?q={query}
```

#### Query Parameters

| Parameter |  Type  |         Description          | Required? | Default |
| :-------: | :----: | :--------------------------: | :-------: | :-----: |
|    `q`    | string | The search suggestion query. |    Yes    |   --    |

#### Request sample

```javascript
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/search/suggest?q=monster"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  suggestions: [
    {
      id: string,
      name: string,
      poster: string,
      jname: string,
      moreInfo: ["Jan 21, 2022", "Movie", "17m"]
    },
    {...},
  ],
}
```

[🔼 Back to Top](#table-of-contents)

### `GET` Producer Animes

#### Endpoint

```sh
https://api-aniwatch.onrender.com/anime/producer/{name}?page={page}
```

#### Path Parameters

| Parameter |  Type  |                 Description                 | Required? | Default |
| :-------: | :----: | :-----------------------------------------: | :-------: | :-----: |
|  `name`   | string | The name of anime producer (in kebab case). |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |          Description           | Required? | Default |
| :-------: | :----: | :----------------------------: | :-------: | :-----: |
|  `page`   | number | The page number of the result. |    No     |   `1`   |

#### Request sample

```javascript
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/producer/toei-animation?page=2"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  producerName: "Toei Animation Anime",
  animes: [
    {
      id: string,
      name: string,
      poster: string,
      duration: string,
      type: string,
      rating: string,
      episodes: {
        sub: number,
        dub: number,
      }
    },
    {...},
  ],
  top10Animes: {
    today: [
      {
        episodes: {
          sub: number,
          dub: number,
        },
        id: string,
        name: string,
        poster: string,
        rank: number
      },
      {...},
    ],
    month: [...],
    week: [...]
  },
  topAiringAnimes: [
    {
      episodes: {
        sub: number,
        dub: number,
      },
      id: string,
      jname: string,
      name: string,
      poster: string,
      type: string
    },
    {...},
  ],
  currentPage: 2,
  totalPages: 11,
  hasNextPage: true,
}
```

[🔼 Back to Top](#table-of-contents)

### `GET` Genre Animes

#### Endpoint

```sh
https://api-aniwatch.onrender.com/anime/genre/{name}?page={page}
```

#### Path Parameters

| Parameter |  Type  |               Description                | Required? | Default |
| :-------: | :----: | :--------------------------------------: | :-------: | :-----: |
|  `name`   | string | The name of anime genre (in kebab case). |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |          Description           | Required? | Default |
| :-------: | :----: | :----------------------------: | :-------: | :-----: |
|  `page`   | number | The page number of the result. |    No     |   `1`   |

#### Request sample

```javascript
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/genre/shounen?page=2"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  genreName: "Shounen Anime",
  animes: [
    {
      id: string,
      name: string,
      poster: string,
      duration: string,
      type: string,
      rating: string,
      episodes: {
        sub: number,
        dub: number,
      }
    },
    {...},
  ],
  genres: ["Action", "Cars", "Adventure", ...],
  topAiringAnimes: [
    {
      episodes: {
        sub: number,
        dub: number,
      },
      id: string,
      jname: string,
      name: string,
      poster: string,
      type: string
    },
    {...},
  ],
  currentPage: 2,
  totalPages: 38,
  hasNextPage: true
}
```

[🔼 Back to Top](#table-of-contents)

### `GET` Category Anime

#### Endpoint

```sh
https://api-aniwatch.onrender.com/anime/{category}?page={page}
```

#### Path Parameters

| Parameter  |  Type  |      Description       | Required? | Default |
| :--------: | :----: | :--------------------: | :-------: | :-----: |
| `category` | string | The category of anime. |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |          Description           | Required? | Default |
| :-------: | :----: | :----------------------------: | :-------: | :-----: |
|  `page`   | number | The page number of the result. |    No     |   `1`   |

#### Request sample

```javascript
// categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

const resp = await fetch("https://api-aniwatch.onrender.com/anime/tv?page=2");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  category: "TV Series Anime",
  animes: [
    {
      id: string,
      name: string,
      poster: string,
      duration: string,
      type: string,
      rating: string,
      episodes: {
        sub: number,
        dub: number,
      }
    },
    {...},
  ],
  genres: ["Action", "Cars", "Adventure", ...],
  top10Animes: {
    today: [
      {
        episodes: {
          sub: number,
          dub: number,
        },
        id: string,
        name: string,
        poster: string,
        rank: number
      },
      {...},
    ],
    month: [...],
    week: [...]
  },
  currentPage: 2,
  totalPages: 100,
  hasNextPage: true
}
```

[🔼 Back to Top](#table-of-contents)

### `GET` Estimated Schedules

#### Endpoint

```sh
https://api-aniwatch.onrender.com/anime/schedule?date={date}
```

#### Query Parameters

|      Parameter      |  Type  |                             Description                              | Required? | Default |
| :-----------------: | :----: | :------------------------------------------------------------------: | :-------: | :-----: |
| `date (yyyy-mm-dd)` | string | The date of the desired schedule. (months & days must have 2 digits) |    Yes    |   --    |

#### Request sample

```javascript
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/schedule?date=2023-01-14"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  scheduledAnimes: [
    {
      id: string,
      time: string, // 24 hours format
      name: string,
      jname: string,
    },
    {...}
  ]
}
```

[🔼 Back to Top](#table-of-contents)

### `GET` Anime Episodes

#### Endpoint

```sh
https://api-aniwatch.onrender.com/anime/episodes/{animeId}
```

#### Path Parameters

| Parameter |  Type  |     Description      | Required? | Default |
| :-------: | :----: | :------------------: | :-------: | :-----: |
| `animeId` | string | The unique anime id. |    Yes    |   --    |

#### Request sample

```javascript
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/episodes/steinsgate-3"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  totalEpisodes: 24,
  episodes: [
    {
      number: 1,
      title: "Turning Point",
      episodeId: "steinsgate-3?ep=213"
      isFiller: false,
    },
    {...}
  ]
}
```

[🔼 Back to Top](#table-of-contents)

### `GET` Anime Episode Servers

#### Endpoint

```sh
https://api-aniwatch.onrender.com/anime/servers?episodeId={id}
```

#### Query Parameters

|  Parameter  |  Type  |      Description       | Required? | Default |
| :---------: | :----: | :--------------------: | :-------: | :-----: |
| `episodeId` | string | The unique episode id. |    Yes    |   --    |

#### Request sample

```javascript
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/servers?episodeId=steinsgate-0-92?ep=2055"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  episodeId: "steinsgate-0-92?ep=2055",
  episodeNo: 5,
  sub: [
    {
      serverId: 4,
      serverName: "vidstreaming",
    },
    {...}
  ],
  dub: [
    {
      serverId: 1,
      serverName: "megacloud",
    },
    {...}
  ],
  raw: [
    {
      serverId: 1,
      serverName: "megacloud",
    },
    {...}
  ],
}
```

[🔼 Back to Top](#table-of-contents)

### `GET` Anime Episode Streaming Links

#### Endpoint

```sh
https://api-aniwatch.onrender.com/anime/episode-srcs?id={episodeId}&server={server}&category={category}
```

#### Query Parameters

| Parameter  |  Type  |                     Description                      | Required? |     Default      |
| :--------: | :----: | :--------------------------------------------------: | :-------: | :--------------: |
|    `id`    | string |                The id of the episode.                |    Yes    |        --        |
|  `server`  | string |               The name of the server.                |    No     | `"vidstreaming"` |
| `category` | string | The category of the episode ('sub', 'dub' or 'raw'). |    No     |     `"sub"`      |

#### Request sample

```javascript
const resp = await fetch(
  "https://api-aniwatch.onrender.com/anime/episode-srcs?id=steinsgate-3?ep=230&server=vidstreaming&category=dub"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  headers: {
    Referer: string,
    "User-Agent": string,
    ...
  },
  sources: [
    {
      url: string, // .m3u8 hls streaming file
      isM3U8: boolean,
      quality?: string,
    },
    {...}
  ],
  subtitles: [
    {
      lang: "English",
      url: string, // .vtt subtitle file
    },
    {...}
  ],
  anilistID: number | null,
  malID: number | null,
}
```

[🔼 Back to Top](#table-of-contents)

## <span id="development">👨‍💻 Development</span>

Pull requests and stars are always welcome. If you encounter any bug or want to add a new feature to this api, consider creating a new [issue](https://github.com/ghoshRitesh12/aniwatch-api/issues). If you wish to contribute to this project, read the [CONTRIBUTING.md](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/CONTRIBUTING.md) file.

## <span id="thanks">🤝 Thanks</span>

- [consumet.ts](https://github.com/consumet/consumet.ts)
- [api.consumet.org](https://github.com/consumet/api.consumet.org)

## <span id="support">🙌 Support</span>

Don't forget to leave a star 🌟. You can also follow me on Twitter [@\_riteshghosh](https://twitter.com/_riteshghosh).

## <span id="license">📜 License</span>

This project is licensed under the [MIT License](https://opensource.org/license/mit/) - see the [LICENSE](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/LICENSE) file for more details.

<br/>

<img
  id="star-history" 
  src="https://api.star-history.com/svg?repos=ghoshRitesh12/aniwatch-api&type=Date&theme=dark"
  alt=""
/>

<br/>

<p align="center">
  Made with 💖 by
  <a href="https://github.com/ghoshRitesh12">
    Ritesh
  <a>
<p>
