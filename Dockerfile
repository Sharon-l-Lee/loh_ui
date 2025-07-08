FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM alpine AS dist
WORKDIR /dist
COPY --from=build /app/dist ./

