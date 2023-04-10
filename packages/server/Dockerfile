FROM node:16 as formfn-api

WORKDIR /usr/src/app

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY ./.yarn ./.yarn

# Copy separately for perf reasons (see https://dev.to/dimitrisnl/comment/ah9f)
COPY packages/server/package.json ./packages/server/
COPY packages/shared/ ./packages/shared/

RUN yarn

COPY ./packages/server/ ./packages/server/

# Build shared modules
WORKDIR /usr/src/app/packages/shared
RUN yarn tsc

# Run server
WORKDIR /usr/src/app/packages/server

ARG database_var
ENV DATABASE_URL=${database_var}

RUN npx prisma generate
RUN yarn tsc

ENV NODE_ENV production

EXPOSE 4000
EXPOSE 4001
EXPOSE 4002
EXPOSE 4003
EXPOSE 8126
ENV NODE_PATH ./dist
CMD [ "node", "dist/src/index.js" ]
USER node
