FROM node:12-alpine

RUN apk add --no-cache \
  git \
  build-base

EXPOSE 3000
WORKDIR /home/node/app

COPY ./package*.json ./
RUN npm install

COPY ./ ./
RUN npm run build

CMD ["npm", "run", "start:prod"]
