# --------------> The build image
FROM node:16-alpine3.15 AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install -g npm@8.18.0
RUN npm install --omit=dev

# --------------> The production image
FROM node:16-alpine3.15
RUN npm install -g npm@8.18.0
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app
CMD ["dumb-init", "node", "server.js"]
