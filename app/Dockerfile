FROM node:16.18.0

WORKDIR /blog_web/
COPY . .

RUN npm i
RUN npm run build

FROM nginx:alpine
LABEL MAINTAINER="1015776502@qq.com"

COPY .docker-compose/nginx/conf.d/my.conf /etc/nginx/conf.d/my.conf
COPY .docker-compose/nginx/nginx.conf /etc/nginx/nginx.conf
#COPY ./cert/Nginx/pkxzx_com_integrated.crt /etc/nginx/cert/pkxzx_com_integrated.crt
#COPY ./cert/Nginx/pkxzx_com.key /etc/nginx/cert/pkxzx_com.key
COPY --from=0 /blog_web/build /usr/share/dist
ENTRYPOINT /bin/cp -rf /usr/share/dist/* /usr/share/nginx/html && nginx-debug -g 'daemon off;'