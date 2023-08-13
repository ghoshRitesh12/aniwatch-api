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

# <p align="center">Aniwatch API</p>

  <p align="center">
    A free restful API serving anime information from <a href="https://aniwatch.to" target="_blank">aniwatch.to</a>
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
      href="https://github.com/ghoshRitesh12/aniwatch-api"
    >
      <img 
        src="https://img.shields.io/github/stars/ghoshRitesh12/aniwatch-api" alt="stars"
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

> ## Work In Progress 🛠️
>
> This api is currently a work in progress

## Table of Contents

- [Installation](#installation)
  - [Local](#local)
- [Documentation](#documentation)
  - [GET Anime Home Page](#get-anime-home-page)
  - [GET Anime About Info](#get-anime-about-info)
  - [GET Search Results](#get-search-results)
  - [GET Search Suggestions](#get-search-suggestions)
  - [GET Producer Animes](#get-producer-animes)
  - [GET Genre Animes](#get-genre-animes)
  - [GET Category Anime](#get-category-anime)
- [Development](#development)
- [Support](#support)
- [License](#license)

## <span id="installation">💻 Installation</span>

### Local

1. Clone the repository and move into the directory.

   ```bash
   git clone https://github.com/ghoshRitesh12/aniwatch-api.git
   cd aniwatch-api
   ```

2. Install all the dependencies.

   ```bash
   npm i #or yarn install
   ```

3. Start the server!

   ```bash
   npm start #or yarn start
   ```

   Now the server should be running on [http://localhost:4000](http://localhost:4000)

## <span id="documentation">📚 Documentation</span>

Below are the endpoints exposed by the api:

### `GET` Anime Home Page

#### Endpoint

```bash
http://localhost:4000/anime/home
```

#### Request sample

```javascript
const resp = await fetch("http://localhost:4000/anime/home");
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

### `GET` Anime About Info

#### Endpoint

```sh
http://localhost:4000/anime/info?id={anime-id}
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|   `id`    | string | The unique anime id (in kebab case). |    Yes    |   --    |

#### Request sample

```javascript
const resp = await fetch(
  "http://localhost:4000/anime/info?id=attack-on-titan-112"
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
      }
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

### `GET` Search Results

#### Endpoint

```sh
http://localhost:4000/anime/search?q={query}&page={page}
```

#### Query Parameters

| Parameter |  Type  |                            Description                            | Required? | Default |
| :-------: | :----: | :---------------------------------------------------------------: | :-------: | :-----: |
|    `q`    | string | The search query, i.e. the title of the item you are looking for. |    Yes    |   --    |
|  `page`   | number |                  The page number of the result.                   |    No     |   `1`   |

#### Request sample

```javascript
const resp = await fetch("http://localhost:4000/anime/search?q=titan&page=1");
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
  hasNextPage: false
}
```

### `GET` Search Suggestions

#### Endpoint

```sh
http://localhost:4000/anime/search/suggest?q={query}
```

#### Query Parameters

| Parameter |  Type  |         Description          | Required? | Default |
| :-------: | :----: | :--------------------------: | :-------: | :-----: |
|    `q`    | string | The search suggestion query. |    Yes    |   --    |

#### Request sample

```javascript
const resp = await fetch(
  "http://localhost:4000/anime/search/suggest?q=monster"
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

### `GET` Producer Animes

#### Endpoint

```sh
http://localhost:4000/anime/producer/{name}?page={page}
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
  "http://localhost:4000/anime/producer/toei-animation?page=2"
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

### `GET` Genre Animes

#### Endpoint

```sh
http://localhost:4000/anime/genre/{name}?page={page}
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
const resp = await fetch("http://localhost:4000/anime/genre/shounen?page=2");
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

### `GET` Category Anime

#### Endpoint

```sh
http://localhost:4000/anime/{category}?page={page}
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
const resp = await fetch("http://localhost:4000/anime/tv?page=2");
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

## <span id="development">👨‍💻 Development</span>

Pull requests and stars are always welcome. If you encounter any bug or want to add a new feature to this api, consider creating a new [issue](https://github.com/ghoshRitesh12/aniwatch-api/issues). If you wish to contribute to this project, read the [CONTRIBUTING.md](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/CONTRIBUTING.md) file.

## <span id="support">🙌 Support</span>

Don't forget to leave a star 🌟

## <span id="license">📜 License</span>

This project is licensed under the [MIT License](https://opensource.org/license/mit/) - see the [LICENSE](https://github.com/ghoshRitesh12/aniwatch-api/blob/main/LICENSE) file for more details.
