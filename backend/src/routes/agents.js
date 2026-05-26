import { Router } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { q } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5';

const SYSTEMS = {
  seo: `You are an expert SEO consultant. Reply in the user's input language.
Structure: 1) Verdict 2) Title tag (≤60ch) 3) Meta description (≤160ch)
4) 6-8 keywords with intent 5) On-page improvements 6) Schema.org @type + key fields.
Be specific, concise.`,
  marketing: `You are a senior digital marketing strategist with a playful, confident voice.
Match the channel asked. LinkedIn ~150w, Twitter ~270ch/tweet, email subjects ≤50ch, ads ≤30ch.
Hook first line, value prop, CTA. No corporate jargon.`,
  writer: `You are an experienced engineering writer. Reply in the user's input language.
Default: Hook → Why it matters → 3-4 H2 sub-sections (## prefix) → Closing + CTA.
Short paragraphs (2-4 sentences). Use code in backticks.`,
};

r.post('/run', requireAuth, async (req, res, next) => {
  try {
    const { agent, prompt, preset, extra } = z.object({
      agent: z.enum(['seo', 'marketing', 'writer']),
      prompt: z.string().min(3).max(2000),
      preset: z.string().optional(),
      extra: z.string().optional(),
    }).parse(req.body);

    const userMsg = [
      preset && `Output format: ${preset}.`,
      extra && `Context: ${extra}`,
      `Request: ${prompt}`,
    ].filter(Boolean).join('\n');

    const result = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      system: SYSTEMS[agent],
      messages: [{ role: 'user', content: userMsg }],
    });

    const output = result.content.map(b => b.text || '').join('');
    const tokensIn = result.usage?.input_tokens || 0;
    const tokensOut = result.usage?.output_tokens || 0;

    const { rows } = await q(
      `INSERT INTO agent_runs (agent, prompt, preset, extra, output, tokens_in, tokens_out, user_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, created_at`,
      [agent, prompt, preset, extra, output, tokensIn, tokensOut, req.user.sub]);

    res.json({ id: rows[0].id, agent, output, created_at: rows[0].created_at,
               tokens: { in: tokensIn, out: tokensOut } });
  } catch (e) { next(e); }
});

r.get('/history', requireAuth, async (req, res, next) => {
  try {
    const agent = req.query.agent;
    const params = [];
    let where = '1=1';
    if (agent) { params.push(agent); where += ` AND agent = $${params.length}`; }
    const { rows } = await q(
      `SELECT id, agent, prompt, preset, output, tokens_in, tokens_out, article_id, created_at
       FROM agent_runs WHERE ${where} ORDER BY created_at DESC LIMIT 100`, params);
    res.json({ runs: rows });
  } catch (e) { next(e); }
});

// Promote an agent run into a draft article
r.post('/promote/:id', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await q('SELECT * FROM agent_runs WHERE id=$1', [req.params.id]);
    const run = rows[0];
    if (!run) return res.status(404).json({ error: 'not found' });
    const title = run.prompt.slice(0, 80);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
    const ins = await q(
      `INSERT INTO articles (slug, title, content_md, status, author_id)
       VALUES ($1, $2, $3, 'draft', $4) RETURNING id, slug`,
      [slug + '-' + Date.now().toString(36), title, run.output, req.user.sub]);
    await q('UPDATE agent_runs SET article_id=$1 WHERE id=$2', [ins.rows[0].id, run.id]);
    res.json({ article: ins.rows[0] });
  } catch (e) { next(e); }
});

export default r;
