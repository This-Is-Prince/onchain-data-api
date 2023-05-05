FROM node:slim

WORKDIR /app

COPY package*.json /app

RUN npm install

EXPOSE 3000

ADD src /app/src
ADD tsconfig.json /app

CMD npm run dev
