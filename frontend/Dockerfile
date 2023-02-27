FROM senorlobito/node18.14-alpine-pnpm AS DEV

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm i

COPY --chown=node:node . .

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

USER node

CMD ["pnpm", "start"]

FROM senorlobito/node18.14-alpine-pnpm AS BUILD

WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch --prod

ADD . ./

RUN pnpm i -r --offline --prod

COPY --chown=node:node . .

USER node

CMD ["pnpm", "exec", "serve", "build"]


