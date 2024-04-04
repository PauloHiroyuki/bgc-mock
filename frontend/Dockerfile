FROM node:latest as angular
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME "/var/cache/nginx"
COPY --from=angular app/dist/bgc-mock-front/browser /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
