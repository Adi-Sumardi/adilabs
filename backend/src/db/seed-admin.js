import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from './pool.js';

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) { console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env'); process.exit(1); }

const hash = await bcrypt.hash(password, 12);
await pool.query(
  `INSERT INTO users (email, password_hash, name, role) VALUES ($1,$2,$3,'admin')
   ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
  [email, hash, 'Adi Sumardi']
);
console.log(`✓ admin user ready: ${email}`);
await pool.end();
