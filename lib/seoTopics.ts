// Topics pool for auto-generated SEO articles
// Each day has its own target audience and language focus

export interface SeoTopic {
  topic: string;
  targetLang: string;
  targetKeywords: string[];
}

// SENIN — Target: Indonesia (mahasiswa IT, yayasan, perusahaan)
export const mondayTopics: SeoTopic[] = [
  {
    topic: 'Tips memilih jasa pembuatan website untuk UMKM yang tepat',
    targetLang: 'id',
    targetKeywords: ['jasa pembuatan website UMKM', 'website murah', 'web developer UMKM'],
  },
  {
    topic: 'Panduan lengkap membuat tugas akhir sistem informasi',
    targetLang: 'id',
    targetKeywords: ['tugas akhir sistem informasi', 'skripsi informatika', 'joki tugas akhir'],
  },
  {
    topic: 'Mengapa yayasan membutuhkan sistem digital di era modern',
    targetLang: 'id',
    targetKeywords: ['sistem informasi yayasan', 'digitalisasi yayasan', 'aplikasi yayasan'],
  },
  {
    topic: 'Perbandingan framework: React vs Vue vs Angular untuk project 2026',
    targetLang: 'id',
    targetKeywords: ['React vs Vue', 'framework terbaik 2026', 'belajar React'],
  },
  {
    topic: 'Berapa biaya pembuatan aplikasi mobile di Indonesia?',
    targetLang: 'id',
    targetKeywords: ['biaya pembuatan aplikasi mobile', 'harga buat aplikasi', 'jasa buat app'],
  },
  {
    topic: 'Cara integrasi payment gateway Midtrans dan Xendit di website',
    targetLang: 'id',
    targetKeywords: ['integrasi Midtrans', 'payment gateway Indonesia', 'Xendit integration'],
  },
  {
    topic: 'Topik tugas akhir informatika yang menarik dan mudah dikerjakan',
    targetLang: 'id',
    targetKeywords: ['topik tugas akhir informatika', 'ide skripsi IT', 'judul TA informatika'],
  },
  {
    topic: 'Dashboard admin: fitur wajib untuk aplikasi bisnis',
    targetLang: 'id',
    targetKeywords: ['dashboard admin', 'fitur dashboard', 'admin panel'],
  },
  {
    topic: 'Pentingnya SEO untuk website bisnis di Indonesia',
    targetLang: 'id',
    targetKeywords: ['SEO website bisnis', 'optimasi Google', 'SEO Indonesia'],
  },
  {
    topic: 'Cara deploy aplikasi Next.js ke Vercel dan AWS',
    targetLang: 'id',
    targetKeywords: ['deploy Next.js', 'hosting website', 'Vercel tutorial'],
  },
];

// RABU — Target: International (Arab, Amerika, Inggris, dll)
export const wednesdayTopics: SeoTopic[] = [
  {
    topic: 'How to choose the right web development agency for your startup',
    targetLang: 'en',
    targetKeywords: ['web development agency', 'hire web developer', 'startup web development'],
  },
  {
    topic: 'The complete guide to building an AI-powered business application',
    targetLang: 'en',
    targetKeywords: ['AI business application', 'AI integration', 'machine learning app'],
  },
  {
    topic: 'Why outsourcing web development to Southeast Asia saves you money',
    targetLang: 'en',
    targetKeywords: ['outsource web development', 'offshore developer', 'affordable web development'],
  },
  {
    topic: 'Building a custom e-commerce platform: features, costs, and timeline',
    targetLang: 'en',
    targetKeywords: ['custom e-commerce', 'online store development', 'e-commerce cost'],
  },
  {
    topic: 'خدمات تطوير التطبيقات للشركات في الشرق الأوسط',
    targetLang: 'ar',
    targetKeywords: ['تطوير التطبيقات', 'شركات البرمجة', 'تطوير المواقع'],
  },
  {
    topic: 'React vs Next.js: Which should you choose for your next project?',
    targetLang: 'en',
    targetKeywords: ['React vs Next.js', 'best React framework', 'Next.js benefits'],
  },
  {
    topic: 'How AI chatbots increase conversion rates for service businesses',
    targetLang: 'en',
    targetKeywords: ['AI chatbot conversion', 'chatbot for business', 'AI sales'],
  },
  {
    topic: 'The future of web development: trends to watch in 2026-2027',
    targetLang: 'en',
    targetKeywords: ['web development trends', 'future of web dev', '2026 technology'],
  },
];

// JUMAT — Target: Southeast Asia (Filipina, Singapura, Malaysia, Vietnam, Thailand)
export const fridayTopics: SeoTopic[] = [
  {
    topic: 'Affordable web development services for Philippine businesses',
    targetLang: 'en',
    targetKeywords: ['web development Philippines', 'website Philippines', 'web developer Manila'],
  },
  {
    topic: 'Web development solutions for Malaysian SMEs',
    targetLang: 'en',
    targetKeywords: ['web development Malaysia', 'website Malaysia', 'web developer KL'],
  },
  {
    topic: 'Singapore startups: why outsource web development?',
    targetLang: 'en',
    targetKeywords: ['web development Singapore', 'Singapore startup', 'outsource Singapore'],
  },
  {
    topic: 'Web and mobile app development for Vietnamese businesses',
    targetLang: 'en',
    targetKeywords: ['web development Vietnam', 'app development Vietnam', 'web developer Hanoi'],
  },
  {
    topic: 'Professional website development services in Thailand',
    targetLang: 'en',
    targetKeywords: ['web development Thailand', 'website Bangkok', 'web developer Thailand'],
  },
  {
    topic: 'How Southeast Asian businesses can leverage AI for growth',
    targetLang: 'en',
    targetKeywords: ['AI Southeast Asia', 'AI business ASEAN', 'digital transformation ASEAN'],
  },
  {
    topic: 'Mga benepisyo ng propesyonal na website para sa negosyo sa Pilipinas',
    targetLang: 'fil',
    targetKeywords: ['website para sa negosyo', 'web development Pilipinas', 'gawa ng website'],
  },
  {
    topic: 'Cross-border e-commerce solutions for ASEAN markets',
    targetLang: 'en',
    targetKeywords: ['ASEAN e-commerce', 'cross-border selling', 'online store ASEAN'],
  },
];

export function getTopicsForDay(dayOfWeek: number): SeoTopic[] {
  switch (dayOfWeek) {
    case 1: return mondayTopics;   // Monday
    case 3: return wednesdayTopics; // Wednesday
    case 5: return fridayTopics;    // Friday
    default: return [];
  }
}
