FROM node:12-alpine as builder
WORKDIR /app
COPY ./package*.json ./
RUN npm ci --no-audit
COPY ./ ./
RUN npm run build -- --prod

FROM nginx:alpine
#COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
