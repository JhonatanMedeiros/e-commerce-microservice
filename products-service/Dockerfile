FROM node:latest

RUN mkdir -p /usr/app
WORKDIR /usr/app

# COPY package*.json ./
RUN npm install
# RUN npm run db:migrate

COPY . ./
