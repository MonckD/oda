FROM node:22-alpine AS build

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm run build

FROM nginx:alpine

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80