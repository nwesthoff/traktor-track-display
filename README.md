# Traktor ID Display

This is a tool to visualize what's being played in real time on Traktor.

## Pre-requisites

Needs ErikMinekus' [Traktor API Client](https://github.com/ErikMinekus/traktor-api-client) to function.

## Run Development

Both the server and frontend must be running and should each be started from their respective folders.

Dev mode can be started like so:

```bash
yarn
yarn dev
```

## Run Production

or if you'd like to run a poduction version take these steps:

### Frontend

in `/frontend`:

```bash
yarn
yarn build
yarn start
```

### backend

in `/server`:

```bash
yarn
yarn start
```
