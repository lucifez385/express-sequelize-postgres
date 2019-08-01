FROM node:8.9-alpine

RUN mkdir -p /usr/src/app
 
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN ls

RUN apk update && apk add ffmpeg

RUN yarn install --production=false -q && \
  yarn run build && \
  yarn install --production=true -q && \
  yarn cache clean
