import { Router } from 'express';
import { q } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();

// Public: log a pageview (rate-limited at app level)
r.post('/track', async (req, res, next) => {
  try {
    const { path: p, articleId, referrer } = req.body || {};
    if (!p) return res.status(400).json({ error: 'path required' });
    await q(
      `INSERT INTO pageviews (path, article_id, referrer, user_agent)
       VALUES ($1,$2,$3,$4)`,
      [p, articleId || null, referrer || null, req.headers['user-agent'] || null]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Admin summary
r.get('/summary', requireAuth, async (_, res, next) => {
  try {
    const totals = await q(`SELECT COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days')::int AS week,
      COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days')::int AS month
      FROM pageviews`);
    const top = await q(
      `SELECT a.id, a.slug, a.title, COUNT(p.id)::int AS views
       FROM articles a LEFT JOIN pageviews p ON p.article_id = a.id
       WHERE a.status='published'
       GROUP BY a.id ORDER BY views DESC LIMIT 10`);
    const daily = await q(
      `SELECT date_trunc('day', created_at) AS day, COUNT(*)::int AS views
       FROM pageviews WHERE created_at > NOW() - INTERVAL '30 days'
       GROUP BY 1 ORDER BY 1`);
    res.json({ totals: totals.rows[0], top: top.rows, daily: daily.rows });
  } catch (e) { next(e); }
});

export default r;
