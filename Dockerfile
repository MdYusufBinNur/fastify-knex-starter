# --------------> The build image
FROM node:16 AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm i --only=production

# --------------> The production image
FROM FROM node:16-alpine3.15
RUN apk add dumb-init
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app
CMD ["dumb-init", "node", "server.js"]


# FROM node:lts-alpine
# RUN apk add dumb-init
# ENV NODE_ENV production
# WORKDIR /usr/src/app
# COPY --chown=node:node . .
# RUN npm i --only=production
# USER node
# CMD ["dumb-init", "node", "server.js"]