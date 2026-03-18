import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogArticles } from '@/lib/blogArticles';
import { getAllArticles, findArticleBySlug } from '@/lib/getAllArticles';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getAllArticles();
  const article = findArticleBySlug(articles, slug);
  if (!article) return {};

  return {
    title: `${article.title} — AdiLabs.id`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: ['Adi Sumardi'],
      locale: article.lang === 'id' ? 'id_ID' : article.lang === 'ar' ? 'ar_SA' : 'en_US',
    },
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactElement[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableKey = 0;

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${tableKey++}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {tableRows[0].map((cell, i) => (
                  <th key={i} className="text-left p-3 bg-white/10 border border-white/10 text-white font-semibold">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(2).map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-3 border border-white/10 text-blue-200/70">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table detection
    if (line.includes('|') && line.trim().startsWith('|')) {
      inTable = true;
      const cells = line.split('|').filter((c) => c.trim() !== '' || false);
      if (!line.match(/^\|[\s-|]+\|$/)) {
        tableRows.push(cells);
      } else {
        tableRows.push(cells); // separator row
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.match(/^### /)) {
      elements.push(<h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.replace(/^### /, '')}</h3>);
    } else if (line.match(/^## /)) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.replace(/^## /, '')}</h2>);
    } else if (line.match(/^# /)) {
      elements.push(<h1 key={i} className="text-3xl sm:text-4xl font-bold text-white mb-6">{line.replace(/^# /, '')}</h1>);
    } else if (line.match(/^- \*\*/)) {
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="ml-4 mb-2 text-blue-200/70 list-disc">
            <strong className="text-white">{match[1]}</strong>{match[2]}
          </li>
        );
      }
    } else if (line.match(/^- /)) {
      elements.push(
        <li key={i} className="ml-4 mb-2 text-blue-200/70 list-disc">
          {line.replace(/^- /, '').replace(/\*\*(.+?)\*\*/g, '$1')}
        </li>
      );
    } else if (line.match(/^\d+\. \*\*/)) {
      const match = line.match(/^\d+\. \*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="ml-4 mb-2 text-blue-200/70 list-decimal">
            <strong className="text-white">{match[1]}</strong>{match[2]}
          </li>
        );
      }
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      // Handle inline markdown: bold, links
      const processed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-amber-400 hover:text-amber-300 underline">$1</a>');
      elements.push(
        <p key={i} className="text-blue-200/70 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: processed }} />
      );
    }
  }

  if (inTable) flushTable();

  return elements;
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const articles = await getAllArticles();
  const article = findArticleBySlug(articles, slug);

  if (!article) notFound();

  const isRtl = article.lang === 'ar';

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    author: { "@type": "Person", name: "Adi Sumardi" },
    publisher: {
      "@type": "Organization",
      name: "AdiLabs.id",
      url: "https://adilabs.id",
    },
    mainEntityOfPage: `https://adilabs.id/blog/${article.slug}`,
    inLanguage: article.lang === 'id' ? 'id-ID' : article.lang === 'ar' ? 'ar' : 'en-US',
    keywords: article.keywords.join(', '),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pt-20 pb-20" dir={isRtl ? 'rtl' : 'ltr'}>
        <Link
          href="/blog"
          className="inline-block mb-8 text-sm text-blue-300/60 hover:text-blue-300 transition-colors"
        >
          &larr; Back to Blog
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
            {article.category}
          </span>
          <span className="text-xs text-white/30">
            {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="text-xs text-white/30">by Adi Sumardi</span>
        </div>

        <div className="prose-custom">
          {renderMarkdown(article.content)}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            {article.lang === 'id' ? 'Tertarik? Konsultasi Gratis Sekarang!' :
             article.lang === 'ar' ? 'مهتم؟ احصل على استشارة مجانية الآن!' :
             'Interested? Get a Free Consultation Now!'}
          </h3>
          <p className="text-blue-200/60 mb-6">
            {article.lang === 'id' ? 'Chat langsung dengan AI Personal Asisten Adi — gratis 24/7' :
             article.lang === 'ar' ? 'تحدث مباشرة مع مساعد Adi الشخصي بالذكاء الاصطناعي — مجاناً على مدار الساعة' :
             'Chat directly with AI Personal Assistant Adi — free 24/7'}
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold rounded-xl hover:scale-105 transition-transform"
          >
            {article.lang === 'id' ? 'Mulai Konsultasi' :
             article.lang === 'ar' ? 'ابدأ الاستشارة' :
             'Start Consultation'}
          </Link>
        </div>
      </article>
    </main>
  );
}
