FROM node:17-alpine AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/api

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "./app/app.js"]
