# Sử dụng bản alpine cho nhẹ (chỉ khoảng 50MB)
FROM node:24.13.0-alpine

WORKDIR /app

# Chỉ copy file package trước để tận dụng cache của Docker
COPY package*.json ./

# Cài đặt thư viện (Sẽ chạy lại nếu package.json thay đổi)
RUN npm install

# Copy toàn bộ code còn lại
COPY . .

# Mở port tương ứng
EXPOSE 3000

CMD ["npm", "run", "start:dev"]