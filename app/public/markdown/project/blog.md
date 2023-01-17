# 一、搭建
**[代码仓库](https://github.com/fishermanxzx/blog)**

**技术栈：react、react-router、ant-design、sass、ts**

注：无论使用什么技术栈，最后只需要一个包含静态文件的文件夹。本文章将该静态文件夹命名为**build**。 

# 二、部署
**技术栈：docker 、docker-compose、nginx**

##  1.准备服务器（**以下步骤在大家选择的服务器平台都有相应的教程，自行查阅**）
1. 购买服务器，我使用的是[阿里云](https://www.aliyun.com/)，大家自行选择
2. 购买域名并备案（备案需要几天，可以先忽略3、4点进行第二大步）
3. 配置DNS解析
4. 购买（阿里云上可以免费领取20个单域名证书）SSL证书，并再次配置DNS解析（这一步非必要）
##  2.进入服务器，安装docker、docker-compose（**使用容器化部署，移植简单且不需要考虑环境差异**）
1. 安装docker，[教程](https://www.runoob.com/docker/docker-tutorial.html)
2. 安装docker-compose，[教程](https://www.runoob.com/docker/docker-compose.html)

##  3.  将项目文件传送到服务器。有以下几种方式
1. 安装git，采用git拉取
2. 使用scp命令
3. 使用其他工具
传输后目录结构:

![tree nginx](/imgs/project/blog/root.png)

* app:react项目文件夹（前端）
* cert:证书文件夹
* nginx:nginx配置文件夹
* serve:服务端文件夹（后端）
* dockerfile_blog:dockerfile配置文件
* docker-compose.yaml:docker-compose配置文件
## 4.编写nginx配置文件（不懂的可以自行查阅）
目录结构：

![tree nginx](/imgs/project/blog/nginx.png)
1. nginx.conf
```conf
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format log_json escape=json '{"time": "$time_iso8601", '
                         '"remote_addr": "$remote_addr", '
                         '"remote_user": "$remote_user", '
                         '"request_uri": "$request_uri",'
                         '"upstream_response_time": "$upstream_response_time",'
                         '"request_time": "$request_time", '
                         '"status": "$status", '
                         '"request": "$request", '
                         '"request_method": "$request_method", '
                         '"referrer": "$http_referer", '
                         '"body_bytes_sent":"$body_bytes_sent", '
                         '"x_forwarded_for": "$http_x_forwarded_for", '
                         '"user_agent": "$http_user_agent", '
                         '"request_body": "$request_body"}';

    access_log  /var/log/nginx/access.log  log_json;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

	# 开启gzip
	gzip on;

	# 启用gzip压缩的最小文件；小于设置值的文件将不会被压缩
	gzip_min_length 1k;

	# gzip 压缩级别 1-10 
	gzip_comp_level 2;

	# 进行压缩的文件类型。

	gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
	# 是否在http header中添加Vary: Accept-Encoding，建议开启
	gzip_vary on;
	
    include /etc/nginx/conf.d/*.conf;
}
```

2. my.conf
```conf

server {
    listen 443 ssl;
    server_name www.pkxzx.com;
    #ssl开头的配置都是证书相关的，没有的可以不配置
    ssl_certificate cert/pkxzx_com_integrated.crt;
    ssl_certificate_key cert/pkxzx_com.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; 
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location / {
        root /usr/share/nginx/html;
        add_header Cache-Control 'must-revalidate, proxy-revalidate, max-age=86400';
        try_files $uri $uri/ /index.html;
    }
}
server {
    listen 80;
    server_name www.pkxzx.com pkxzx.com;
    rewrite ^(.*)$ https://$host$1 permanent;
}
```
## 5.编写dockerfile与yaml
1. dockerfile
```txt
#依赖的node镜像
FROM node:14.16.0
#设置工作目录
WORKDIR /app/
#拷贝根目录的app文件夹到当前工作目录
COPY app/ .
RUN rm package-lock.json
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install 
RUN npm run build

#依赖的nginx镜像
FROM nginx:alpine
LABEL MAINTAINER="xiezixuan"
#拷贝配置文件
COPY ./nginx/conf.d/my.conf /etc/nginx/conf.d/my.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
#拷贝证书
COPY ./cert/Nginx/pkxzx_com_integrated.crt /etc/nginx/cert/pkxzx_com_integrated.crt
COPY ./cert/Nginx/pkxzx_com.key /etc/nginx/cert/pkxzx_com.key
#关键 拷贝第一个构造阶段build好的文件到dist目录
COPY --from=0 /app/build /usr/share/dist
RUN mkdir -p /var/log/nginx/
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
#html文件夹为真正的静态目录文件夹
ENTRYPOINT /bin/cp -rf /usr/share/dist/* /usr/share/nginx/html && nginx-debug -g 'daemon off;'
```

**注：上面打了关键的地方，是本文一开始讲的build文件夹，若你已经准备好编译好的文件夹则可以替换为`COPY  build文件的目录 /usr/share/dist `**，且可以忽略上文node镜像的构建。

2. docker-compose.yaml
```yaml
version: "3.8"
services:
  blog:
    build:
      context: ./
      dockerfile: ./dockerfile_blog
    container_name: blog-web
    restart: always
    ports: # 端口映射  host主机端口:容器内端口
      - '80:80'
      - '443:443'
    command: [ 'nginx', '-g', 'daemon off;' ]
    volumes:
      - ../blog_html:/usr/share/nginx/html
      - ~/logs/blog_web/:/var/log/nginx/
```

6. 打包上线  
根目录下执行
` docker-compose build && docker-compose up -d `

7. 到此，可以愉快的输入自己的域名看效果啦～😄