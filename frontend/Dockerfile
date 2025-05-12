FROM node:20-alpine3.20 AS build
# node v20.19.0
# npm 10.8.2
#RUN npm install -g @angular/cli@19.2.11 
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:alpine
RUN mkdir -p /app
COPY --from=build /app/dist/frontend/browser/* /usr/share/nginx/html
