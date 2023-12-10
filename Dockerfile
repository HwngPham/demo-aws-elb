FROM node:18.16-alpine

WORKDIR /usr/www
COPY . .

RUN npm i
RUN npm run build

EXPOSE 8000
CMD ["npm", "start"]
