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

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

USER node

FROM nginx:1.23-alpine as PROD

ENV NODE_ENV production

COPY --from=BUILD /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]


