# 打包前端资源
yarn build:web:prod &&

# 定义Docker镜像名
IMAGE_NAME="dg-agent-client-ui"
TAG=Alpha

# 检查是否存在同名镜像并删除
if docker image inspect $IMAGE_NAME:$TAG > /dev/null 2>&1; then
    echo "发现同名镜像，正在删除..."
    docker image rm $IMAGE_NAME:$TAG
fi

# 构建Docker镜像
docker build -f docker/Dockerfile -t $IMAGE_NAME:$TAG . &&

# 保存Docker镜像为tar.gz文件
docker save -o ./${IMAGE_NAME}.tar.gz $IMAGE_NAME:$TAG
