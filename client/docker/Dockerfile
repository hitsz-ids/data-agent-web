# 使用 Nginx 镜像
FROM nginx:latest

# 将构建的静态文件复制到 Nginx 的服务目录
COPY ./dist/ /usr/share/nginx/html/dist

# 自定义的 Nginx 配置文件，复制到镜像内
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
