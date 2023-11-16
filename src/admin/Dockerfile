# 1. Create an image to build n8n
FROM node:14.15-alpine as builder

# Update everything and install needed dependencies
USER root

# 切换国内源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
RUN npm config set registry https://npm.ekuaibao.com/
RUN npm_config_user=root

WORKDIR /data

COPY package.json .

RUN npm install

COPY . .

RUN ls -lsh

RUN npm run build


FROM nginx

EXPOSE 80/tcp

COPY --from=builder /data/dist/ /usr/share/nginx/html

