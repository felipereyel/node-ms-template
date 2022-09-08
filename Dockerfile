FROM node:18-alpine AS base
WORKDIR /app/

FROM base as builder
COPY package.json package-lock.json tsconfig.json ./
RUN npm install
COPY ./src ./src
RUN npm run build

FROM base as release
COPY --from=builder /app/build ./build
USER node
CMD node ./build/main.js
