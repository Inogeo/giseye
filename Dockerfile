FROM node:16
WORKDIR /home/node/app/
COPY ./app/package*.json ./
RUN npm install
ENV NODE_ENV=development
ENV WATCHPACK_POLLING=true
COPY ./app/ .
EXPOSE 3000
ENTRYPOINT npm run start