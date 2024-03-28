<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Bookmarks-API] A NEST-JS API for managing bookmarks with auth features

## Installation

```bash
$ npm install
```

## Pre-Requirement
- Docker installed

## Running the app

```bash
# development
$ npm run db:dev:restart # stops and starts the running container fo postgres
$ npm run start

# watch mode
$ npm run db:dev:restart # stops and starts the running container fo postgres
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run db:test:restart # stops and starts the running container fo postgres
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Nest is [MIT licensed](LICENSE).
