# Etapa 1: Build de Angular
FROM node:20-slim as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
