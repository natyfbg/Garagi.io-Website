FROM node:lts-alpine as build

WORKDIR /app

COPY . .

RUN yarn install  && yarn build

FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/build/ .
# COPY ./run.sh /app/run.sh

RUN yarn global add serve

CMD ["serve", "-l", "3000", "-s", "."]