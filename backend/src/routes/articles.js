import { Router } from 'express';
import { z } from 'zod';
import slugify from 'slugify';
import { q } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
import { mdToHtml, readingMinutes } from '../services/markdown.js';

const r = Router();

const ArticleInput = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().optional(),
  excerpt: z.string().max(400).optional(),
  content_md: z.string().min(1),
  cover_image: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'review', 'published']).default('draft'),
  seo_title: z.string().max(70).optional().nullable(),
  seo_description: z.string().max(180).optional().nullable(),
  seo_keywords: z.array(z.string()).optional().default([]),
});

// Public list (published only)
r.get('/', async (req, res, next) => {
  try {
    const tag = req.query.tag;
    const params = [];
    let where = `status = 'published'`;
    if (tag) { params.push(tag); where += ` AND $${params.length} = ANY(tags)`; }
    const { rows } = await q(
      `SELECT id, slug, title, excerpt, cover_image, tags, reading_minutes, published_at
       FROM articles WHERE ${where} ORDER BY published_at DESC LIMIT 50`, params);
    res.json({ articles: rows });
  } catch (e) { next(e); }
});

r.get('/by-slug/:slug', async (req, res, next) => {
  try {
    const { rows } = await q(`SELECT * FROM articles WHERE slug=$1 AND status='published'`, [req.params.slug]);
    if (!rows[0]) return res.status(404).json({ error: 'not found' });
    res.json({ article: rows[0] });
  } catch (e) { next(e); }
});

// Admin: list all (any status)
r.get('/admin/all', requireAuth, async (_, res, next) => {
  try {
    const { rows } = await q(`SELECT id, slug, title, status, tags, updated_at, published_at
                              FROM articles ORDER BY updated_at DESC LIMIT 200`);
    res.json({ articles: rows });
  } catch (e) { next(e); }
});

r.post('/', requireAuth, async (req, res, next) => {
  try {
    const data = ArticleInput.parse(req.body);
    const slug = (data.slug || slugify(data.title, { lower: true, strict: true })).slice(0, 80);
    const html = mdToHtml(data.content_md);
    const minutes = readingMinutes(data.content_md);
    const publishedAt = data.status === 'published' ? new Date() : null;

    const { rows } = await q(
      `INSERT INTO articles (slug, title, excerpt, content_md, content_html, cover_image, tags,
        status, seo_title, seo_description, seo_keywords, reading_minutes, author_id, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [slug, data.title, data.excerpt, data.content_md, html, data.cover_image, data.tags,
       data.status, data.seo_title, data.seo_description, data.seo_keywords, minutes,
       req.user.sub, publishedAt]);
    res.status(201).json({ article: rows[0] });
  } catch (e) { next(e); }
});

r.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const data = ArticleInput.partial().parse(req.body);
    const html = data.content_md ? mdToHtml(data.content_md) : undefined;
    const minutes = data.content_md ? readingMinutes(data.content_md) : undefined;

    const fields = []; const values = []; let i = 1;
    const set = (k, v) => { if (v !== undefined) { fields.push(`${k}=$${i++}`); values.push(v); } };
    set('title', data.title); set('slug', data.slug); set('excerpt', data.excerpt);
    set('content_md', data.content_md); set('content_html', html);
    set('cover_image', data.cover_image); set('tags', data.tags); set('status', data.status);
    set('seo_title', data.seo_title); set('seo_description', data.seo_description);
    set('seo_keywords', data.seo_keywords); set('reading_minutes', minutes);
    if (data.status === 'published') { fields.push(`published_at = COALESCE(published_at, NOW())`); }
    if (!fields.length) return res.json({ ok: true });
    values.push(req.params.id);
    const { rows } = await q(`UPDATE articles SET ${fields.join(', ')} WHERE id=$${i} RETURNING *`, values);
    res.json({ article: rows[0] });
  } catch (e) { next(e); }
});

r.delete('/:id', requireAuth, async (req, res, next) => {
  try { await q('DELETE FROM articles WHERE id=$1', [req.params.id]); res.json({ ok: true }); }
  catch (e) { next(e); }
});

export default r;
