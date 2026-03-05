# Himgrow Secure API

Express + Prisma + PostgreSQL backend with login/register support.

## 1. Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` with your PostgreSQL URL and strong JWT secrets.

## 2. Database

```bash
npx prisma generate
npx prisma migrate dev --name init_auth
```

## 3. Run API

```bash
npm run dev
```

API base URL: `http://localhost:4000/api`

## 4. Auth Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/health`

## 5. Firewall + Safety Baseline

- Keep database private (no public inbound from internet).
- Allow DB inbound only from backend service network/security group.
- Put API behind Cloudflare WAF (or cloud WAF equivalent).
- Allow only HTTPS traffic to API.
- Keep production `CORS_ORIGIN` set to exact frontend domain.
- Rotate JWT secrets and database credentials periodically.
