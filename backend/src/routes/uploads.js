import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { q } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();
const dir = process.env.UPLOAD_DIR || './uploads';
await fs.mkdir(dir, { recursive: true });

const maxMb = Number(process.env.MAX_UPLOAD_MB || 8);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxMb * 1024 * 1024 },
  fileFilter: (_, file, cb) => /image\/(png|jpe?g|webp)/.test(file.mimetype) ? cb(null, true) : cb(new Error('image only')),
});

r.post('/image', requireAuth, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'no file' });
    const id = crypto.randomBytes(8).toString('hex');
    const filename = `${id}.webp`;
    const out = path.join(dir, filename);

    const img = sharp(req.file.buffer).rotate();
    const meta = await img.metadata();
    await img.resize({ width: 1600, withoutEnlargement: true })
             .webp({ quality: 82 }).toFile(out);

    const stat = await fs.stat(out);
    const url = `/uploads/${filename}`;
    await q(
      `INSERT INTO uploads (filename, mime_type, size_bytes, width, height, user_id)
       VALUES ($1,'image/webp',$2,$3,$4,$5)`,
      [filename, stat.size, meta.width || null, meta.height || null, req.user.sub]);
    res.json({ url, filename, size: stat.size, width: meta.width, height: meta.height });
  } catch (e) { next(e); }
});

export default r;
