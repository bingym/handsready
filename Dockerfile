FROM node:22.17.0 as builder
WORKDIR '/app'
COPY TreasureChest /app

RUN yarn install && yarn build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
