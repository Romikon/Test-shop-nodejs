FROM node:14

WORKDIR /usr/src/index
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN chmod +x ./startup.sh

CMD ["bash", "./startup.sh"]