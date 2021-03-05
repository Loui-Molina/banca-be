FROM node:14-alpine As development

WORKDIR /banca-be/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:14-alpine  as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /banca-be/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /banca-be/src/app/dist ./dist

CMD ["node", "dist/main"]