import jwt from 'jsonwebtoken';

export const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

export const verify = (token) => jwt.verify(token, process.env.JWT_SECRET);

export const requireAuth = (req, res, next) => {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'unauthorized' });
  try { req.user = verify(token); next(); }
  catch { res.status(401).json({ error: 'invalid token' }); }
};
