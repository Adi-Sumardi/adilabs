import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { q } from '../db/pool.js';
import { sign, requireAuth } from '../middleware/auth.js';

const r = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 10 });

r.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = z.object({
      email: z.string().email(), password: z.string().min(8),
    }).parse(req.body);

    const { rows } = await q('SELECT id, email, name, role, password_hash FROM users WHERE email=$1', [email]);
    const u = rows[0];
    if (!u || !(await bcrypt.compare(password, u.password_hash))) {
      return res.status(401).json({ error: 'invalid credentials' });
    }
    const token = sign({ sub: u.id, email: u.email, role: u.role, name: u.name });
    res.json({ token, user: { id: u.id, email: u.email, name: u.name, role: u.role } });
  } catch (e) { next(e); }
});

r.get('/me', requireAuth, (req, res) => res.json({ user: req.user }));

export default r;
