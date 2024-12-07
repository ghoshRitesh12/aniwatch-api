# [2.2.0](https://github.com/ghoshRitesh12/aniwatch-api/compare/v2.1.0...v2.2.0) (2024-12-07)


### Features

* **cache:** add `AniwatchAPICache` class to implement API caching layer ([b7d036d](https://github.com/ghoshRitesh12/aniwatch-api/commit/b7d036dbe29fcfa39c6573a0f02888093eb43d78))
* **cache:** add middleware to insert `CACHE_CONFIG` variable in request context ([da83048](https://github.com/ghoshRitesh12/aniwatch-api/commit/da83048f908c1505cc1157a8344ab1a75208130d))
* **cache:** integrated Redis caching layer for endpoint responses ([5cd99fc](https://github.com/ghoshRitesh12/aniwatch-api/commit/5cd99fcc642e54c1f26306a722d5ebeb8fff75a3))
* **envs:** standardized env examples and add new redis connection url env ([9d379ec](https://github.com/ghoshRitesh12/aniwatch-api/commit/9d379ec4fe99782dc8e5340f2895cf11399bb1f9))
* **server:** add aniwatch variables types for type-safe req context variable access ([db02218](https://github.com/ghoshRitesh12/aniwatch-api/commit/db022185efd04d4382883de543d3f3399cd28a6b))



# [2.1.0](https://github.com/ghoshRitesh12/aniwatch-api/compare/v2.0.2...v2.1.0) (2024-10-29)


### Features

* add `.editorconfig` ([90c0e86](https://github.com/ghoshRitesh12/aniwatch-api/commit/90c0e869abaae168bc07fe93782b65651f45dfc8))
* **prettier:** add `.prettierignore` ([23fcd4a](https://github.com/ghoshRitesh12/aniwatch-api/commit/23fcd4a19f7da2817782d557b6d5e6f664b3b584))
* **prettier:** add `prettier.config.mjs` ([9ae824b](https://github.com/ghoshRitesh12/aniwatch-api/commit/9ae824b42c2665869e0a7bc964339ee6cc414d1a))



## [2.0.2](https://github.com/ghoshRitesh12/aniwatch-api/compare/v2.0.1...v2.0.2) (2024-10-06)



## [2.0.1](https://github.com/ghoshRitesh12/aniwatch-api/compare/v2.0.0...v2.0.1) (2024-10-06)



# [2.0.0](https://github.com/ghoshRitesh12/aniwatch-api/compare/v1.40.0...v2.0.0) (2024-10-05)


* Aniwatch API Version 2 (#66) ([46f688a](https://github.com/ghoshRitesh12/aniwatch-api/commit/46f688ac12a99b8fb145b0745dd4cc6babff1e1e)), closes [#66](https://github.com/ghoshRitesh12/aniwatch-api/issues/66)


### BREAKING CHANGES

* * chore: remove files that are not necessary for api v2

* test: update existing tests to use  pkg

* feat: organized aniwatch api envs and add more info about them

* feat: update tsconfig to include strict noUnsed params

* feat(api homepage): revamp api home page

* feat: update wani kuni image

* feat: add dot img

* feat: use hono cors

* feat: use hono rate limiter

* build: remove unnecessary deps, add ones needed and update description

* feat: add hianime routes and their handlers

* feat: update vercel deployment file

* docs: update logo and scraper docs, add envs section

* feat: update main server file

* feat: update peronal deployments caution section



