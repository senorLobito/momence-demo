FROM node:18.14-alpine AS DEV

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

USER node

FROM node:18.14-alpine AS BUILD

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=DEV /app/node_modules ./node_modules

RUN npm i --frozen-lockfile

COPY --chown=node:node . .

RUN mkdir build/ && chmod -R 777 build/

RUN npm run build

ENV NODE_ENV production

USER node


