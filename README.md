<p align="center">
    <a href="https://github.com/ghoshRitesh12/aniwatch-api">
        <img 
            src="https://raw.githubusercontent.com/ghoshRitesh12/aniwatch-api/refs/heads/main/public/img/hianime_v2.png" 
            alt="aniwatch_logo" 
            width="175" 
            height="175"
            decoding="async"
            fetchpriority="high"
        />
    </a>
</p>

# <p align="center">Aniwatch API</p>

<div align="center">
    A free RESTful API serving anime information from <a href="https://hianimez.to" target="_blank">hianimez.to</a>

  <br/>

  <div>
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
  </div>
</div>

<br/>

<div align="center">

[![codeql](https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/codeql-analysis.yml)
[![docker-build](https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/docker-build.yml/badge.svg)](https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/docker-build.yml)
[![test_coverage](https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/test.yml/badge.svg)](https://github.com/ghoshRitesh12/aniwatch-api/actions/workflows/test.yml)
[![GitHub License](https://img.shields.io/github/license/ghoshRitesh12/aniwatch-api?logo=github&logoColor=%23959da5&labelColor=%23292e34&color=%2331c754)](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/LICENSE)

</div>

<div align="center">

[![stars](https://img.shields.io/github/stars/ghoshRitesh12/aniwatch-api?style=social)](https://github.com/ghoshRitesh12/aniwatch-api/stargazers)
[![forks](https://img.shields.io/github/forks/ghoshRitesh12/aniwatch-api?style=social)](https://github.com/ghoshRitesh12/aniwatch-api/network/members)
[![issues](https://img.shields.io/github/issues/ghoshRitesh12/aniwatch-api?style=social&logo=github)](https://github.com/ghoshRitesh12/aniwatch-api/issues?q=is%3Aissue+is%3Aopen+)
[![version](https://img.shields.io/github/v/release/ghoshRitesh12/aniwatch-api?display_name=release&style=social&logo=github)](https://github.com/ghoshRitesh12/aniwatch-api/releases/latest)

</div>

> [!IMPORTANT]
>
> 1. There was previously a hosted version of this API for showcasing purposes only, and it was misused; since then, there have been no other hosted versions. It is recommended to deploy your own instance for personal use by customizing the API as you need it to be.
> 2. This API is just an unofficial API for [hianimez.to](https://hianimez.to) and is in no other way officially related to the same.
> 3. The content that this API provides is not mine, nor is it hosted by me. These belong to their respective owners. This API just demonstrates how to build an API that scrapes websites and uses their content.

## Table of Contents

- [Installation](#installation)
    - [Local](#local)
    - [Docker](#docker)
- [Configuration](#️configuration)
    - [Custom HTTP Headers](#custom-http-headers)
    - [Environment Variables](#environment-variables)
- [Host your instance](#host-your-instance)
    - [Vercel](#vercel)
    - [Render](#render)
- [Documentation](#documentation)
    - [GET Anime Home Page](#get-anime-home-page)
    - [GET Anime A-Z List](#get-anime-a-z-list)
    - [GET Anime Qtip Info](#get-anime-qtip-info)
    - [GET Anime About Info](#get-anime-about-info)
    - [GET Search Results](#get-search-results)
    - [GET Search Suggestions](#get-search-suggestions)
    - [GET Producer Animes](#get-producer-animes)
    - [GET Genre Animes](#get-genre-animes)
    - [GET Category Animes](#get-category-animes)
    - [GET Estimated Schedules](#get-estimated-schedules)
    - [GET Anime Episodes](#get-anime-episodes)
    - [GET Anime Next Episode Schedule](#get-anime-next-episode-schedule)
    - [GET Anime Episode Servers](#get-anime-episode-servers)
    - [GET Anime Episode Streaming Links](#get-anime-episode-streaming-links)
- [Development](#development)
- [Contributors](#contributors)
- [Thanks](#thanks)
- [Support](#support)
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

The Docker image is available at [The GitHub Container Registry](https://github.com/ghoshRitesh12/aniwatch-api/pkgs/container/aniwatch).

Run the following commands to pull and run the docker image.

```bash
docker run -d --name aniwatch-api -p 4000:4000 ghcr.io/ghoshritesh12/aniwatch
```

The above command will start the server on port 4000. You can access the server at [http://localhost:4000](http://localhost:4000), and you can also change the port by changing the `-p` option to `-p <port>:4000`.

The `-d` flag runs the container in detached mode, and the `--name` flag is used to name the container that's about to run.

## <span id="configuration">⚙️ Configuration</span>

### Custom HTTP Headers

Currently this API supports parsing of only one custom header, and more may be implemented in the future to accommodate varying needs.

- `Aniwatch-Cache-Expiry`: This custom request header is used to specify the cache expiration duration in **seconds** (defaults to 300 or 5 mins if the header is missing). The `ANIWATCH_API_REDIS_CONN_URL` env is required for this custom header to function as intended; otherwise, there's no point in setting this custom request header. A **response header** of the same name is also returned with the value set to the cache expiration duration in seconds if `ANIWATCH_API_REDIS_CONN_URL` env is set.

### Environment Variables

More info can be found in the [`.env.example`](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/.env.example) file, where envs' having a value that is contained within `<` `>` angled brackets, commented out or not, are just examples and should be replaced with relevant ones.

- `ANIWATCH_API_PORT`: Port number of the aniwatch API.
- `ANIWATCH_API_WINDOW_MS`: Duration to track requests for rate limiting (in milliseconds).
- `ANIWATCH_API_MAX_REQS`: Maximum number of requests in the `ANIWATCH_API_WINDOW_MS` time period.
- `ANIWATCH_API_CORS_ALLOWED_ORIGINS`: Allowed origins, separated by commas and no spaces in between (CSV).
- `ANIWATCH_API_DEPLOYMENT_ENV`: The deployment environment of the Aniwatch API. Many configurations depend on this env, rate limiting being one of them. It must be set incase of serverless deployments; otherwise, you may run into weird issues. Possible values: `'nodejs' | 'docker' | 'vercel' | 'render' | 'cloudflare-workers'`.
- `ANIWATCH_API_HOSTNAME`: Set this to your api instance's hostname to enable rate limiting, don't have this value if you don't wish to rate limit.
- `ANIWATCH_API_REDIS_CONN_URL`: This env is optional by default and can be set to utilize Redis caching functionality. It has to be a valid connection URL; otherwise, the Redis client can throw unexpected errors.
- `ANIWATCH_API_S_MAXAGE`: Specifies the maximum amount of time (in seconds) a resource is considered fresh when served by a CDN cache.
- `ANIWATCH_API_STALE_WHILE_REVALIDATE`: Specifies the amount of time (in seconds) a resource is served stale while a new one is fetched.

## <span id="host-your-instance">⛅ Host your instance</span>

> [!CAUTION]
>
> For personal deployments:
>
> - If you want to have rate limiting in your application, then set the `ANIWATCH_API_HOSTNAME` env to your deployed instance's hostname; otherwise, don't set or have this env at all. If you set this env to an incorrect value, you may face other issues.
> - It's optional by default, but if you want to have endpoint response caching functionality, then set the `ANIWATCH_API_REDIS_CONN_URL` env to a valid Redis connection URL. If the connection URL is invalid, the Redis client can throw unexpected errors.
> - You **may or may not** wanna remove the last `if` block within the [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) in the [`server.ts`](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/src/server.ts) file. It is for **render free deployments** only, as their free tier has an approx 10 or 15 minute sleep time. That `if` block keeps the server awake and prevents it from sleeping. You can enable the automatic health check by setting the environment variables `ANIWATCH_API_HOSTNAME` to your deployment's hostname, and `ANIWATCH_API_DEPLOYMENT_ENV` to `render` in your environment variables. If you are not using render, you can remove that `if` block.
> - If you are using a serverless deployment, then set the `ANIWATCH_API_DEPLOYMENT_ENV` env to `vercel` or `render` or `cloudflare-workers` depending on your deployment platform. This is because the API uses this env to configure different functionalities, such as rate limiting, graceful shutdown or hosting static files.

### Vercel

Deploy your own instance of Aniwatch API on Vercel.

> [!NOTE]
>
> When deploying to vercel, you must set the env named `ANIWATCH_API_DEPLOYMENT_ENV` to `vercel` for proper functioning of the API.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ghoshRitesh12/aniwatch-api)

### Render

Deploy your own instance of Aniwatch API on Render.

> [!NOTE]
>
> When deploying to render, you must set the env named `ANIWATCH_API_DEPLOYMENT_ENV` to `render` for proper functioning of the API.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ghoshRitesh12/aniwatch-api)

## <span id="documentation">📚 Documentation</span>

The endpoints exposed by the api are listed below with examples that uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), but you can use any http library.

<details>

<summary>

### `GET` Anime Home Page

</summary>

#### Endpoint

```bash
/api/v2/hianime/home
```

#### Request Sample

```javascript
const resp = await fetch("/api/v2/hianime/home");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
    genres: ["Action", "Cars", "Adventure", ...],
    latestEpisodeAnimes: [
      {
        id: string,
        name: string,
        poster: string,
        type: string,
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
    mostPopularAnimes: [
      {
        id: string,
        name: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number,
        }
      },
      {...},
    ],
    mostFavoriteAnimes: [
      {
        id: string,
        name: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number,
        }
      },
      {...},
    ],
    latestCompletedAnimes: [
      {
        id: string,
        name: string,
        poster: string,
        type: string,
        episodes: {
          sub: number,
          dub: number,
        }
      },
      {...},
    ],
  }
}

```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Anime A-Z List

</summary>

#### Endpoint

```sh
/api/v2/hianime/azlist/{sortOption}?page={page}
```

#### Path Parameters

|  Parameter   |  Type  |                                             Description                                             | Required? | Default |
| :----------: | :----: | :-------------------------------------------------------------------------------------------------: | :-------: | :-----: |
| `sortOption` | string | The az-list sort option. Possible values include: "all", "other", "0-9" and all english alphabets . |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |          Description           | Required? | Default |
| :-------: | :----: | :----------------------------: | :-------: | :-----: |
|  `page`   | number | The page number of the result. |    No     |   `1`   |

#### Request Sample

```javascript
const resp = await fetch("/api/v2/hianime/azlist/0-9?page=1");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
    sortOption: "0-9",
    animes: [
      {
        id: string,
        name: string,
        jname: string,
        poster: string,
        duration: string,
        type: string,
        rating: string,
        episodes: {
          sub: number ,
          dub: number
        }
      },
      {...}
    ],
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Anime Qtip Info

</summary>

#### Endpoint

```sh
/api/v2/hianime/qtip/{animeId}
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `animeId` | string | The unique anime id (in kebab case). |    Yes    |   --    |

#### Request Sample

```javascript
const resp = await fetch("/api/v2/hianime/qtip/one-piece-100");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
    anime: {
      id: "one-piece-100",
      name: "One Piece",
      malscore: string,
      quality: string,
      episodes: {
        sub: number,
        dub: number
      },
      type: string,
      description: string,
      jname: string,
      synonyms: string,
      aired: string,
      status: string,
      genres: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Shounen", "Drama", "Fantasy", "Shounen", "Fantasy", "Shounen", "Shounen", "Super Power"]
    }
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Anime About Info

</summary>

#### Endpoint

```sh
/api/v2/hianime/anime/{animeId}
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `animeId` | string | The unique anime id (in kebab case). |    Yes    |   --    |

#### Request Sample

```javascript
const resp = await fetch("/api/v2/hianime/anime/attack-on-titan-112");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
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
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Search Results

</summary>

#### Endpoint

```sh
# basic example
/api/v2/hianime/search?q={query}&page={page}

# advanced example
/api/v2/hianime/search?q={query}&page={page}&genres={genres}&type={type}&sort={sort}&season={season}&language={sub_or_dub}&status={status}&rated={rating}&start_date={yyyy-mm-dd}&end_date={yyyy-mm-dd}&score={score}
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

#### Request Sample

```javascript
// basic example
const resp = await fetch("/api/v2/hianime/search?q=titan&page=1");
const data = await resp.json();
console.log(data);

// advanced example
const resp = await fetch(
    "/api/v2/hianime/search?q=girls&genres=action,adventure&type=movie&sort=score&season=spring&language=dub&status=finished-airing&rated=pg-13&start_date=2014-0-0&score=good"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
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
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Search Suggestions

</summary>

#### Endpoint

```sh
/api/v2/hianime/search/suggestion?q={query}
```

#### Query Parameters

| Parameter |  Type  |         Description          | Required? | Default |
| :-------: | :----: | :--------------------------: | :-------: | :-----: |
|    `q`    | string | The search suggestion query. |    Yes    |   --    |

#### Request Sample

```javascript
const resp = await fetch("/api/v2/hianime/search/suggestion?q=monster");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
    suggestions: [
      {
        id: string,
        name: string,
        poster: string,
        jname: string,
        moreInfo: ["Jan 21, 2022", "Movie", "17m"]
      },
      {...},
    ]
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Producer Animes

</summary>

#### Endpoint

```sh
/api/v2/hianime/producer/{name}?page={page}
```

#### Path Parameters

| Parameter |  Type  |                 Description                 | Required? | Default |
| :-------: | :----: | :-----------------------------------------: | :-------: | :-----: |
|  `name`   | string | The name of anime producer (in kebab case). |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |          Description           | Required? | Default |
| :-------: | :----: | :----------------------------: | :-------: | :-----: |
|  `page`   | number | The page number of the result. |    No     |   `1`   |

#### Request Sample

```javascript
const resp = await fetch("/api/v2/hianime/producer/toei-animation?page=2");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
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
    hasNextPage: true
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Genre Animes

</summary>

#### Endpoint

```sh
/api/v2/hianime/genre/{name}?page={page}
```

#### Path Parameters

| Parameter |  Type  |               Description                | Required? | Default |
| :-------: | :----: | :--------------------------------------: | :-------: | :-----: |
|  `name`   | string | The name of anime genre (in kebab case). |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |          Description           | Required? | Default |
| :-------: | :----: | :----------------------------: | :-------: | :-----: |
|  `page`   | number | The page number of the result. |    No     |   `1`   |

#### Request Sample

```javascript
const resp = await fetch("/api/v2/hianime/genre/shounen?page=2");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
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
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Category Animes

</summary>

#### Endpoint

```sh
/api/v2/hianime/category/{name}?page={page}
```

#### Path Parameters

| Parameter  |  Type  |      Description       | Required? | Default |
| :--------: | :----: | :--------------------: | :-------: | :-----: |
| `category` | string | The category of anime. |    Yes    |   --    |

#### Query Parameters

| Parameter |  Type  |          Description           | Required? | Default |
| :-------: | :----: | :----------------------------: | :-------: | :-----: |
|  `page`   | number | The page number of the result. |    No     |   `1`   |

#### Request Sample

```javascript
// categories -> "most-favorite", "most-popular", "subbed-anime", "dubbed-anime", "recently-updated", "recently-added", "top-upcoming", "top-airing", "movie", "special", "ova", "ona", "tv", "completed"

const resp = await fetch("/api/v2/hianime/category/tv?page=2");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
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
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Estimated Schedules

</summary>

#### Endpoint

```sh
/api/v2/hianime/schedule?date={date}
```

#### Query Parameters

| Parameter |  Type  |                               Description                               | Required? | Default |
| :-------: | :----: | :---------------------------------------------------------------------: | :-------: | :-----: |
|  `date`   | string | The date of the desired schedule in the following format: (yyyy-mm-dd). |    Yes    |   --    |

#### Request Sample

```javascript
const resp = await fetch("/api/v2/hianime/schedule?date=2024-06-09");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
    scheduledAnimes: [
      {
        id: string,
        time: string, // 24 hours format
        name: string,
        jname: string,
        airingTimestamp: number,
        secondsUntilAiring: number
      },
      {...}
    ]
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Anime Episodes

</summary>

#### Endpoint

```sh
/api/v2/hianime/anime/{animeId}/episodes
```

#### Path Parameters

| Parameter |  Type  |     Description      | Required? | Default |
| :-------: | :----: | :------------------: | :-------: | :-----: |
| `animeId` | string | The unique anime id. |    Yes    |   --    |

#### Request Sample

```javascript
const resp = await fetch("/api/v2/hianime/anime/steinsgate-3/episodes");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
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
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Anime Next Episode Schedule

</summary>

#### Endpoint

```sh
/api/v2/hianime/anime/{animeId}/next-episode-schedule
```

#### Path Parameters

| Parameter |  Type  |     Description      | Required? | Default |
| :-------: | :----: | :------------------: | :-------: | :-----: |
| `animeId` | string | The unique anime id. |    Yes    |   --    |

#### Request Sample

```javascript
const resp = await fetch(
    "/api/v2/hianime/anime/steinsgate-3/next-episode-schedule"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
    airingISOTimestamp: string | null,
    airingTimestamp: number | null,
    secondsUntilAiring: number | null
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Anime Episode Servers

</summary>

#### Endpoint

```sh
/api/v2/hianime/episode/servers?animeEpisodeId={id}
```

#### Query Parameters

|    Parameter     |  Type  |         Description          | Required? | Default |
| :--------------: | :----: | :--------------------------: | :-------: | :-----: |
| `animeEpisodeId` | string | The unique anime episode id. |    Yes    |   --    |

#### Request Sample

```javascript
const resp = await fetch(
    "/api/v2/hianime/episode/servers?animeEpisodeId=steinsgate-0-92?ep=2055"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
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
    ]
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

<details>

<summary>

### `GET` Anime Episode Streaming Links

</summary>

#### Endpoint

```sh
/api/v2/hianime/episode/sources?animeEpisodeId={id}?server={server}&category={dub || sub || raw}
```

#### Query Parameters

|    Parameter     |  Type  |                     Description                      | Required? | Default  |
| :--------------: | :----: | :--------------------------------------------------: | :-------: | :------: |
| `animeEpisodeId` | string |             The unique anime episode id.             |    Yes    |    --    |
|     `server`     | string |               The name of the server.                |    No     | `"hd-1"` |
|    `category`    | string | The category of the episode ('sub', 'dub' or 'raw'). |    No     | `"sub"`  |

#### Request Sample

```javascript
const resp = await fetch(
    "/api/v2/hianime/episode/sources?animeEpisodeId=steinsgate-3?ep=230&server=hd-1&category=dub"
);
const data = await resp.json();
console.log(data);
```

#### Response Schema

```javascript
{
  success: true,
  data: {
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
    malID: number | null
  }
}
```

[🔼 Back to Top](#table-of-contents)

</details>

## <span id="development">👨‍💻 Development</span>

Pull requests and stars are always welcome. If you encounter any bug or want to add a new feature to this api, consider creating a new [issue](https://github.com/ghoshRitesh12/aniwatch-api/issues). If you wish to contribute to this project, read the [CONTRIBUTING.md](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/CONTRIBUTING.md) file.

## <span id="contributors">✨ Contributors</span>

Thanks to the following people for keeping this project alive and relevant.

[![](https://contrib.rocks/image?repo=ghoshRitesh12/aniwatch-api)](https://github.com/ghoshRitesh12/aniwatch-api/graphs/contributors)

## <span id="thanks">🤝 Thanks</span>

- [consumet.ts](https://github.com/consumet/consumet.ts)
- [api.consumet.org](https://github.com/consumet/api.consumet.org)
- [@itzzzme](https://github.com/itzzzme)
- [@Ciarands](https://github.com/Ciarands)

## <span id="support">🙌 Support</span>

Don't forget to leave a star 🌟. You can also follow me on X (Twitter) [@riteshgsh](https://x.com/riteshgsh).

## <span id="license">📜 License</span>

This project is licensed under the [MIT License](https://opensource.org/license/mit/) - see the [LICENSE](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/LICENSE) file for more details.

<br/>

## <span id="star-history">🌟 Star History</span>

<img
  id="star-history" 
  src="https://starchart.cc/ghoshRitesh12/aniwatch-api.svg?variant=adaptive"
  alt=""
/>
