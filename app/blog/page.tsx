import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/getAllArticles';

export const metadata: Metadata = {
  title: 'Blog — AdiLabs.id | Web Development, AI & Tech Insights',
  description: 'Articles about web development, AI integration, business digitalization, and technology insights from AdiLabs. Available in English, Indonesian, Arabic, and more.',
  openGraph: {
    title: 'Blog — AdiLabs.id',
    description: 'Web development, AI & tech insights from AdiLabs.id',
  },
};

const langLabels: Record<string, string> = {
  id: '🇮🇩 Indonesia',
  en: '🇺🇸 English',
  ar: '🇸🇦 العربية',
  fil: '🇵🇭 Filipino',
  vi: '🇻🇳 Tiếng Việt',
  th: '🇹🇭 ไทย',
};

const categoryColors: Record<string, string> = {
  Layanan: 'bg-blue-500/20 text-blue-300',
  Bisnis: 'bg-amber-500/20 text-amber-300',
  Teknologi: 'bg-green-500/20 text-green-300',
  Services: 'bg-blue-500/20 text-blue-300',
  Technology: 'bg-green-500/20 text-green-300',
  AI: 'bg-purple-500/20 text-purple-300',
  'الخدمات': 'bg-blue-500/20 text-blue-300',
  'Serbisyo': 'bg-blue-500/20 text-blue-300',
  'Dịch vụ': 'bg-blue-500/20 text-blue-300',
  'Dich vu': 'bg-blue-500/20 text-blue-300',
  'บริการ': 'bg-blue-500/20 text-blue-300',
  Mahasiswa: 'bg-cyan-500/20 text-cyan-300',
  Enterprise: 'bg-amber-500/20 text-amber-300',
  Education: 'bg-cyan-500/20 text-cyan-300',
  Business: 'bg-amber-500/20 text-amber-300',
};

export default async function BlogPage() {
  const sortedArticles = await getAllArticles();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="pt-20 pb-12 text-center px-4">
        <Link
          href="/"
          className="inline-block mb-8 text-sm text-blue-300/60 hover:text-blue-300 transition-colors"
        >
          &larr; Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
            Blog & Insights
          </span>
        </h1>
        <p className="text-blue-200/60 max-w-2xl mx-auto">
          Web development tips, AI insights, and business digitalization guides — in multiple languages.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pb-20">
        <div className="grid gap-6">
          {sortedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[article.category] || 'bg-white/10 text-white/60'}`}>
                  {article.category}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                  {langLabels[article.lang] || article.lang}
                </span>
                <span className="text-xs text-white/30">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-2" dir={article.lang === 'ar' ? 'rtl' : 'ltr'}>
                {article.title}
              </h2>
              <p className="text-sm text-blue-200/50 line-clamp-2" dir={article.lang === 'ar' ? 'rtl' : 'ltr'}>
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
