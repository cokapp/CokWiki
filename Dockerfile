#用于部署纯node程序CokWiki
FROM node:0.10-onbuild
MAINTAINER cokapp "charlie@cokapp.com"

RUN mkdir /root/workspace

ADD ./ /root/workspace/cokwiki

WORKDIR /root/workspace/cokwiki
RUN npm install

EXPOSE 8086
CMD ["node", "app.js"]
