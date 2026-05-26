# adilabs.id — Backend & Admin

Monorepo untuk portfolio adilabs.id dengan backend lengkap, admin dashboard, dan integrasi AI agents.

## Struktur

```
/
├── Portfolio.html, ai-workshop.html, ...   # Frontend portfolio (existing)
├── backend/                                 # Node.js + Express + PostgreSQL API
│   ├── src/
│   │   ├── index.js                         # Server entry
│   │   ├── db/                              # Postgres pool + migrations
│   │   ├── routes/                          # /auth, /articles, /agents, /uploads, /analytics
│   │   ├── middleware/                      # auth, rate-limit, error
│   │   ├── services/                        # claude, slug, sitemap, rss, image
│   │   └── lib/                             # jwt, password, validators
│   ├── migrations/                          # SQL schema versioning
│   ├── uploads/                             # cover images (gitignored)
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── admin/                                   # React admin dashboard
│   ├── admin.html
│   ├── admin.jsx
│   ├── admin.css
│   └── components/
└── .github/workflows/deploy.yml             # Auto-deploy on push to main
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  adilabs.id                                              │
│  ├── /              → Portfolio.html (static)           │
│  ├── /blog/:slug    → Article SSG (rendered from DB)    │
│  ├── /admin         → admin.html (auth-gated SPA)       │
│  ├── /ai-workshop   → ai-workshop.html (existing)       │
│  ├── /rss.xml       → /api/rss                          │
│  ├── /sitemap.xml   → /api/sitemap                      │
│  └── /api/*         → backend (Express, port 3001)      │
└─────────────────────────────────────────────────────────┘
                              ↓
                         PostgreSQL
                         + filesystem uploads/
                         + Anthropic Claude API
```

## Quick start (development)

```bash
# 1. Database
createdb adilabs
psql adilabs < backend/migrations/001_init.sql

# 2. Backend
cd backend
cp .env.example .env       # fill DATABASE_URL, JWT_SECRET, ANTHROPIC_API_KEY, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run migrate
npm run seed:admin         # creates your admin user
npm run dev                # http://localhost:3001

# 3. Frontend (just open html files or `npx serve .`)
```

## Production deploy (VPS)

See `.github/workflows/deploy.yml` and `DEPLOY.md`.
