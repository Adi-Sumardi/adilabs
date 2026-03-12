import { blogArticles, BlogArticle } from './blogArticles';
import { promises as fs } from 'fs';
import path from 'path';

export async function getAllArticles(): Promise<BlogArticle[]> {
  const allArticles = [...blogArticles];

  // Try to read AI-generated articles
  try {
    const generatedPath = path.join(process.cwd(), 'data', 'generated-articles.json');
    const data = await fs.readFile(generatedPath, 'utf-8');
    const generated: BlogArticle[] = JSON.parse(data);
    allArticles.push(...generated);
  } catch {
    // No generated articles yet, that's fine
  }

  // Sort by date descending
  allArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return allArticles;
}

export function findArticleBySlug(articles: BlogArticle[], slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
