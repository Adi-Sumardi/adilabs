-- 001_init.sql — initial schema for adilabs.id

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  excerpt         TEXT,
  content_md      TEXT NOT NULL,
  content_html    TEXT,
  cover_image     TEXT,
  tags            TEXT[] DEFAULT '{}',
  status          TEXT NOT NULL DEFAULT 'draft', -- draft|review|published
  seo_title       TEXT,
  seo_description TEXT,
  seo_keywords    TEXT[],
  reading_minutes INTEGER,
  author_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at    TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_articles_status_published ON articles(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN (tags);

CREATE TABLE IF NOT EXISTS agent_runs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent       TEXT NOT NULL, -- seo|marketing|writer
  prompt      TEXT NOT NULL,
  preset      TEXT,
  extra       TEXT,
  output      TEXT NOT NULL,
  tokens_in   INTEGER,
  tokens_out  INTEGER,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  article_id  UUID REFERENCES articles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_agent_runs_agent_time ON agent_runs(agent, created_at DESC);

CREATE TABLE IF NOT EXISTS pageviews (
  id          BIGSERIAL PRIMARY KEY,
  path        TEXT NOT NULL,
  article_id  UUID REFERENCES articles(id) ON DELETE CASCADE,
  referrer    TEXT,
  user_agent  TEXT,
  country     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pageviews_article_time ON pageviews(article_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pageviews_path ON pageviews(path);

CREATE TABLE IF NOT EXISTS uploads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename    TEXT NOT NULL,
  mime_type   TEXT NOT NULL,
  size_bytes  INTEGER NOT NULL,
  width       INTEGER,
  height      INTEGER,
  user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at ON articles;
CREATE TRIGGER articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
