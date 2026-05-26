import { Router } from 'express';
import { q } from '../db/pool.js';

const r = Router();
const SITE = process.env.PUBLIC_URL || 'https://adilabs.id';
const escape = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

r.get('/rss', async (_, res, next) => {
  try {
    const { rows } = await q(
      `SELECT slug, title, excerpt, published_at FROM articles
       WHERE status='published' ORDER BY published_at DESC LIMIT 30`);
    const items = rows.map(a => `
      <item>
        <title>${escape(a.title)}</title>
        <link>${SITE}/blog/${a.slug}</link>
        <guid>${SITE}/blog/${a.slug}</guid>
        <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
        <description>${escape(a.excerpt || '')}</description>
      </item>`).join('');
    res.type('application/rss+xml').send(
`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel>
  <title>Adi Sumardi — adilabs</title>
  <link>${SITE}</link>
  <description>Notes on engineering, performance, and SaaS.</description>
  <language>en</language>${items}
</channel></rss>`);
  } catch (e) { next(e); }
});

r.get('/sitemap', async (_, res, next) => {
  try {
    const { rows } = await q(
      `SELECT slug, updated_at FROM articles WHERE status='published'`);
    const urls = [
      { loc: SITE + '/', lastmod: new Date().toISOString() },
      { loc: SITE + '/ai-workshop', lastmod: new Date().toISOString() },
      ...rows.map(a => ({ loc: `${SITE}/blog/${a.slug}`, lastmod: new Date(a.updated_at).toISOString() })),
    ];
    res.type('application/xml').send(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>`);
  } catch (e) { next(e); }
});

export default r;
