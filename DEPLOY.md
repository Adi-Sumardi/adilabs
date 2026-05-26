# Deployment guide — adilabs.id

## 1. Provision VPS (one-time)

```bash
# Install runtime
sudo apt update && sudo apt install -y nodejs npm postgresql nginx certbot python3-certbot-nginx

# Create app user
sudo useradd -m -s /bin/bash adilabs
sudo mkdir -p /opt/adilabs /var/www/adilabs
sudo chown -R adilabs:adilabs /opt/adilabs /var/www/adilabs

# Postgres
sudo -u postgres psql -c "CREATE USER adilabs WITH PASSWORD 'CHANGE_ME';"
sudo -u postgres psql -c "CREATE DATABASE adilabs OWNER adilabs;"

# SSL
sudo certbot --nginx -d adilabs.id -d www.adilabs.id

# Service
sudo cp deploy/adilabs-api.service /etc/systemd/system/
sudo systemctl enable adilabs-api

# Nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/adilabs
sudo ln -s /etc/nginx/sites-available/adilabs /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 2. Configure .env on the VPS

```bash
sudo -u adilabs nano /opt/adilabs/backend/.env
# fill all values from backend/.env.example
```

## 3. First seed

```bash
cd /opt/adilabs/backend
sudo -u adilabs npm ci --omit=dev
sudo -u adilabs node src/db/migrate.js
sudo -u adilabs node src/db/seed-admin.js
sudo systemctl start adilabs-api
```

## 4. GitHub Actions secrets

Add to repo Settings → Secrets:
- `VPS_HOST` — IP or domain
- `VPS_USER` — `adilabs`
- `VPS_SSH_KEY` — private key contents

Push to `main` → auto-deploys.

## 5. Verify

- https://adilabs.id/                   → portfolio
- https://adilabs.id/ai-workshop        → AI workshop
- https://adilabs.id/admin              → admin login
- https://adilabs.id/api/health         → `{ ok: true }`
- https://adilabs.id/rss.xml            → RSS feed
- https://adilabs.id/sitemap.xml        → Sitemap
