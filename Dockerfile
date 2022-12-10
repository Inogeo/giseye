FROM node:16
WORKDIR /home/node/app/
COPY ./app/ .
RUN npm install
ENV NODE_ENV=development
ENV WATCHPACK_POLLING=true
EXPOSE 3000
ENTRYPOINT npm start