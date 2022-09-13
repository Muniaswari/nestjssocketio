FROM node:alpine

WORKDIR /wolf
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm","start"]