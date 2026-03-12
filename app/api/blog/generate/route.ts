import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getTopicsForDay, SeoTopic } from '@/lib/seoTopics';
import { promises as fs } from 'fs';
import path from 'path';

const CRON_SECRET = process.env.CRON_SECRET || '';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

async function generateArticle(client: Anthropic, topic: SeoTopic): Promise<{
  slug: string;
  title: string;
  description: string;
  content: string;
  lang: string;
  keywords: string[];
  category: string;
}> {
  const langInstruction = topic.targetLang === 'ar'
    ? 'Write the entire article in Arabic.'
    : topic.targetLang === 'id'
    ? 'Write the entire article in Bahasa Indonesia.'
    : topic.targetLang === 'fil'
    ? 'Write the entire article in Filipino/Tagalog.'
    : 'Write the entire article in English.';

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: `You are an SEO content writer for AdiLabs.id, a professional web & app development agency.

Write an SEO-optimized blog article about: "${topic.topic}"

Target keywords: ${topic.targetKeywords.join(', ')}

${langInstruction}

Requirements:
1. Article must be 600-1000 words
2. Use markdown formatting (# for title, ## for sections, ### for subsections)
3. Include the target keywords naturally throughout the article
4. Always mention AdiLabs.id and its services
5. Include a call-to-action at the end directing readers to adilabs.id
6. Include a mention of the free 24/7 AI consultation feature
7. Be informative and helpful, not just promotional
8. Contact info: WhatsApp +6285121379697, Email adisumardi888@gmail.com

Respond in this exact JSON format:
{
  "title": "SEO-optimized article title",
  "description": "150-160 character meta description with keywords",
  "content": "Full markdown article content",
  "category": "One word category (e.g., Technology, Business, Services, AI, Education)"
}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  // Parse JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse AI response');

  const parsed = JSON.parse(jsonMatch[0]);
  const slug = slugify(parsed.title);

  return {
    slug,
    title: parsed.title,
    description: parsed.description,
    content: parsed.content,
    lang: topic.targetLang,
    keywords: topic.targetKeywords,
    category: parsed.category || 'Technology',
  };
}

export async function POST(request: NextRequest) {
  // Verify cron secret or allow manual trigger with API key
  const authHeader = request.headers.get('authorization');
  const isCron = authHeader === `Bearer ${CRON_SECRET}`;
  const isManual = request.headers.get('x-api-key') === CRON_SECRET;

  if (CRON_SECRET && !isCron && !isManual) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Determine which day's topics to use
    const body = await request.json().catch(() => ({}));
    const dayOverride = body.day; // Allow manual day override: 1=Mon, 3=Wed, 5=Fri
    const today = dayOverride || new Date().getDay();

    const topics = getTopicsForDay(today);
    if (topics.length === 0) {
      return NextResponse.json({
        message: 'No articles scheduled for today',
        day: today,
      });
    }

    // Pick a random topic that hasn't been used recently
    const generatedArticlesPath = path.join(process.cwd(), 'data', 'generated-articles.json');

    let existingArticles: Array<{ slug: string; publishedAt: string; [key: string]: unknown }> = [];
    try {
      const data = await fs.readFile(generatedArticlesPath, 'utf-8');
      existingArticles = JSON.parse(data);
    } catch {
      // File doesn't exist yet
    }

    const usedTopics = new Set(existingArticles.map((a) => a.slug));
    const availableTopics = topics.filter(
      (t) => !usedTopics.has(slugify(t.topic))
    );
    const selectedTopic = availableTopics.length > 0
      ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
      : topics[Math.floor(Math.random() * topics.length)]; // If all used, pick random

    // Generate article
    const article = await generateArticle(client, selectedTopic);
    const now = new Date().toISOString().split('T')[0];

    const newArticle = {
      ...article,
      publishedAt: now,
      generatedAt: new Date().toISOString(),
    };

    // Save to data/generated-articles.json
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    existingArticles.push(newArticle);
    await fs.writeFile(generatedArticlesPath, JSON.stringify(existingArticles, null, 2));

    return NextResponse.json({
      success: true,
      article: {
        slug: newArticle.slug,
        title: newArticle.title,
        lang: newArticle.lang,
        publishedAt: newArticle.publishedAt,
      },
    });
  } catch (error) {
    console.error('Article generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate article' },
      { status: 500 }
    );
  }
}

// GET — Vercel Cron triggers this endpoint
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const isCron = authHeader === `Bearer ${CRON_SECRET}`;

  // If it's a cron trigger, generate article
  if (isCron || !CRON_SECRET) {
    try {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const today = new Date().getDay();

      const topics = getTopicsForDay(today);
      if (topics.length === 0) {
        return NextResponse.json({ message: 'No articles scheduled for today', day: today });
      }

      const generatedArticlesPath = path.join(process.cwd(), 'data', 'generated-articles.json');
      let existingArticles: Array<{ slug: string; [key: string]: unknown }> = [];
      try {
        const data = await fs.readFile(generatedArticlesPath, 'utf-8');
        existingArticles = JSON.parse(data);
      } catch { /* empty */ }

      const usedTopics = new Set(existingArticles.map((a) => a.slug));
      const availableTopics = topics.filter((t) => !usedTopics.has(slugify(t.topic)));
      const selectedTopic = availableTopics.length > 0
        ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
        : topics[Math.floor(Math.random() * topics.length)];

      const article = await generateArticle(client, selectedTopic);
      const newArticle = {
        ...article,
        publishedAt: new Date().toISOString().split('T')[0],
        generatedAt: new Date().toISOString(),
      };

      await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
      existingArticles.push(newArticle);
      await fs.writeFile(generatedArticlesPath, JSON.stringify(existingArticles, null, 2));

      return NextResponse.json({ success: true, article: { slug: newArticle.slug, title: newArticle.title, lang: newArticle.lang } });
    } catch (error) {
      console.error('Cron article generation error:', error);
      return NextResponse.json({ error: 'Failed to generate article' }, { status: 500 });
    }
  }

  // Otherwise, list generated articles
  try {
    const generatedArticlesPath = path.join(process.cwd(), 'data', 'generated-articles.json');
    const data = await fs.readFile(generatedArticlesPath, 'utf-8');
    const articles = JSON.parse(data);
    return NextResponse.json({ count: articles.length, articles });
  } catch {
    return NextResponse.json({ count: 0, articles: [] });
  }
}
