FROM node:latest AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 따로 build해서 Prod repo에 올리는 법
# $ cd nginx
# $ docker buildx build -t [image_name]:[tag] . // 이미지 빌드
# $ docker buildx build -t react19-vite-template:latest . // 이미지 빌드 예시
# $ docker tag [image_name]:[tag] [repo_name]/[image_name]:[tag] // 이미지 태그
# $ docker tag react19-vite-template:latest withbbang/react19-vite-template:latest // 이미지 태그 예시
# $ docker push [repo_name]/[image_name]:[tag] // 이미지 푸시
# $ docker push withbbang/react19-vite-template:latest // 이미지 푸시 예시