FROM node:10
WORKDIR usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD [ "node", "index.js" ]