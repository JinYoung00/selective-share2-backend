# Node.js base image
FROM node:20 AS builder   

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 복사 및 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 복사
COPY . .
COPY .env .env
# NestJS 빌드
RUN npm run build


# --- 실제 실행용 이미지 (프로덕션) ---
FROM node:20 AS production
WORKDIR /app

# 필요한 파일만 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

# 애플리케이션 실행
CMD ["node", "dist/main.js"]