FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g serve
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8087
CMD [ "serve","-p","8087","-s","dist"]
