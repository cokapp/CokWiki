#搭建一个内嵌Node和Mongodb的镜像
FROM centos
MAINTAINER cokapp "charlie@cokapp.com"


#更新系统
RUN yum -y update
RUN yum -y install epel-release

#安装NodeJs
RUN yum -y install nodejs
RUN yum -y install npm

RUN mkdir /root/workspace

ADD ./ /root/workspace/cokwiki

RUN cd /root/workspace/cokwiki
RUN npm instll
#RUN /root/workspace/cokwiki/bin/startup.sh

EXPOSE 8086
CMD ["node", "/root/workspace/cokwiki/app.js"]
