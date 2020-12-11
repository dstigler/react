FROM node:12.16.3-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . . 
EXPOSE 8080

CU=true

CMD ["npm", "start"]
