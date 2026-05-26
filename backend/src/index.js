import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { pool } from './db/pool.js';
import authRoutes from './routes/auth.js';
import articlesRoutes from './routes/articles.js';
import agentsRoutes from './routes/agents.js';
import uploadsRoutes from './routes/uploads.js';
import analyticsRoutes from './routes/analytics.js';
import publicRoutes from './routes/public.js';
import { errorHandler } from './middleware/error.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: (process.env.CORS_ORIGIN || '*').split(','), credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(process.env.UPLOAD_DIR || './uploads', { maxAge: '30d' }));

const apiLimiter = rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: 'draft-7' });
app.use('/api', apiLimiter);

app.get('/api/health', async (_, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.use('/api/auth', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api', publicRoutes); // /api/rss, /api/sitemap

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`adilabs api listening on :${port}`));
