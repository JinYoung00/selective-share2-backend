## 🧠 Selective Share 2 - Backend

NestJS 기반의 개인 데이터의 공유/보상 시스템 백엔드 API 서버입니다.
컨트랙트 연동, 보상 지급, 사용자 토큰 조회 등 블록체인 연동 기능을 포함합니다.

---

### 📦 기술 스택

* **Language**: TypeScript
* **Framework**: [NestJS](https://nestjs.com/)
* **Blockchain**: Ethers.js 기반 스마트 컨트랙트 연동
* **환경 구성**: Docker, Render, GitHub Actions

---

### 🛠 주요 기능

* `GET /health`
  → 서버 상태 확인용 Ping API

* `GET /balance/:userAddress`
  → 특정 유저의 토큰 잔액 조회

* `POST /users/:userAddress/rewards`
  → 서명 기반 사용자 보상 지급

  * body: `{ type: number, signature: string }`

---

### ⚙️ 실행 방법

#### 로컬 환경

```bash
npm install
npm run start
```

#### Docker 환경

```bash
docker build -t selective-share2 .
docker run -p 3000:3000 selective-share2
```

---

### 🚀 배포 환경

* Render.com에 Dockerfile 기반 배포
* Health Check: `/health`

---

### 🧪 테스트 (예정 or 작성 중)

* Unit 테스트 및 E2E 테스트 준비 중

---

## 개선 필요

* timeout 추가

