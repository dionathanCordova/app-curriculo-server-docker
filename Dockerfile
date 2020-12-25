FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home

WORKDIR /home/node/api

COPY package.json yarn.* ./
COPY ormconfig.docker.js ./ormconfig.js
COPY .env .

USER node

RUN yarn install

COPY . .

EXPOSE 3333

CMD [ "npm", "run", "dev:server" ]