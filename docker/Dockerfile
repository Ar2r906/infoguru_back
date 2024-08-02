FROM node:19
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install -g nodemon
COPY . .
EXPOSE 8000
ENTRYPOINT ["nodemon","server.js"]