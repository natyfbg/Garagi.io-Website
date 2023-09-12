FROM node:16-alpine as build

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install 

COPY ./prisma ./prisma
RUN yarn prisma generate

COPY ./ ./

RUN yarn build

FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/yarn.lock ./

RUN yarn install --production
RUN yarn prisma generate

COPY --from=build /app/dist ./dist

RUN ls

CMD ["yarn", "start:prod"]