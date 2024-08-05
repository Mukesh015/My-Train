FROM  node:22-alpine

WORKDIR /client/app

COPY  package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn dev" ]