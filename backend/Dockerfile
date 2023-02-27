FROM senorlobito/node18.14-alpine-pnpm AS DEV

WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm i

COPY --chown=node:node . .

USER node

FROM senorlobito/node18.14-alpine-pnpm AS BUILD

WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml ./

COPY --chown=node:node --from=DEV /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm run build

ENV NODE_ENV production

RUN pnpm i --frozen-lockfile --prod

USER node

FROM senorlobito/node18.14-alpine-pnpm AS PROD

COPY --chown=node:node --from=BUILD /app/node_modules ./node_modules
COPY --chown=node:node --from=BUILD /app/dist ./dist

CMD [ "node", "dist/main.js" ]