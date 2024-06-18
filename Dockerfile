### STAGE 1: Build ###
FROM node:20.9.0-alpine AS build
WORKDIR /app
COPY  ./ /app/
RUN npm install
RUN npm run build
### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build app/dist/landing-entrevistador /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
EXPOSE 8888