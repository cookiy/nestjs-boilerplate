# NestJS REST API boilerplate 🇷🇺 🇵🇸

## Description <!-- omit in toc -->

NestJS REST API boilerplate for typical project

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Quick run](#quick-run)
- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Automatic update of dependencies](#automatic-update-of-dependencies)
- [Database utils](#database-utils)
- [Tests](#tests)
- [Tests in Docker](#tests-in-docker)
- [Test benchmarking](#test-benchmarking)

## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Sign in and sign up via email.
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Admin and User roles.
- [x] Swagger.
- [x] Docker.
- [ ] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [ ] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [ ] File uploads. Support local and Amazon S3 drivers.
- [ ] units tests.
- [ ] CI (Github Actions).

## Quick run

```bash
git clone --depth 1 https://github.com/cookiy/nestjs-boilerplate.git my-app
cd my-app/
cp env-example .env
```



## Comfortable development

```bash
git clone --depth 1 https://github.com/cookiy/nestjs-boilerplate.git my-app
cd my-app/
.env file configuration information is changed to your own information
```


```bash
pnpm install

pnpm db:seed

pnpm start:dev
```

## Links

- Swagger: <http://localhost:8899/docs>


## Database utils

Generate migration

```bash
npm run migration:generate -- ${path}
```

Run migration

```bash
npm run migration:run
```


Run seed

```bash
npm run db:seed
```

Reset seed

```bash
npm run db:reset
```
## Tests

```bash
# unit tests
npm run test

