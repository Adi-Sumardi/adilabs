/* ============================================================
   lab-content.js — shared content for both lab directions
   ============================================================ */

window.LAB_CONTENT = {
  brand: {
    code: 'ADILABS',
    name: 'Adi Sumardi',
    role: 'Fullstack Engineer',
    facility: 'R&D · Jakarta Timur · GMT+7',
    email: 'adisumardi888@gmail.com',
    github: 'https://github.com/Adi-Sumardi',
    linkedin: 'https://www.linkedin.com/in/adi-sumardi-9037b0156',
    coords: '-6.2088° S · 106.8456° E',
    established: 'EST. 2021',
    license: 'LIC-2026-ADL-007',
  },

  // Hero / facility readout
  facility: {
    designation: 'ADL-LAB-01',
    classification: 'CLASS·II / FULLSTACK ENGINEERING',
    operational: 'NOMINAL',
    capacity: '01 / 03 SLOTS',
    cycle: 'Q2 · 2026',
    intake: 'JUN 2026',
    headline: ['Fullstack', 'Engineering', 'Laboratory'],
    intent: 'Sistem produksi yang scalable, API yang bersih, dan migrasi legacy yang tidak membangunkan tim di jam 3 pagi.',
  },

  // Lab status — currently building / shipped / archived
  status: {
    currentlyBuilding: [
      { code: 'EXP-014', name: 'adilabs.id backend', tech: 'Node · Postgres', pct: 72 },
      { code: 'EXP-015', name: 'AI Workshop v2', tech: 'React · Claude', pct: 45 },
    ],
    shippedThisQuarter: 4,
    archived: 18,
  },

  // Project catalog — "experiments"
  experiments: [
    {
      code: 'EXP-013', year: 2025, status: 'shipped',
      name: 'Legacy Migration', subtitle: 'PHP → Node.js',
      desc: 'Migrasi sistem manajemen internal berbasis PHP legacy ke arsitektur React.js + Node.js modern. Performa, skalabilitas, dan UX core business operations meningkat signifikan.',
      tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
      metric: '+40%', metricLabel: 'page load',
      filters: ['saas', 'migration', 'backend'],
      featured: true,
    },
    {
      code: 'EXP-012', year: 2024, status: 'shipped',
      name: 'Asset Vault', subtitle: 'DAM Platform',
      desc: 'Platform digital asset management dengan 8.000+ file dan 200+ user aktif. Role-based access, storage workflow yang optimized, dan audit trail untuk operasional tim creative.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS S3', 'Redis'],
      metric: '8K+', metricLabel: 'assets',
      filters: ['saas', 'backend', 'frontend'],
    },
    {
      code: 'EXP-011', year: 2024, status: 'shipped',
      name: 'Operations API', subtitle: 'RESTful Suite',
      desc: 'RESTful API dan backend service untuk sistem operasional & pelaporan internal. JWT auth, arsitektur modular, dan integrasi database high-performance.',
      tech: ['Node.js', 'Express', 'Laravel', 'JWT'],
      metric: '200+', metricLabel: 'active users',
      filters: ['backend'],
    },
    {
      code: 'EXP-010', year: 2024, status: 'shipped',
      name: 'Pipeline Refit', subtitle: 'CI/CD Overhaul',
      desc: 'GitHub Actions + Docker untuk streamline deployment workflow. Release reliability naik, development cycle dipercepat dari hitungan jam ke hitungan menit.',
      tech: ['Docker', 'GitHub Actions', 'AWS', 'Linux'],
      metric: '−90%', metricLabel: 'manual work',
      filters: ['devops', 'backend'],
    },
    {
      code: 'EXP-009', year: 2024, status: 'shipped',
      name: 'Insight Dashboard', subtitle: 'Realtime Analytics',
      desc: 'Web dashboard responsif dengan reporting real-time, integrasi analytics, dan arsitektur frontend performance-focused untuk decision-making harian.',
      tech: ['Next.js', 'React', 'WebSocket', 'PostgreSQL'],
      metric: '24/7', metricLabel: 'live reporting',
      filters: ['frontend', 'saas'],
    },
    {
      code: 'EXP-008', year: 2023, status: 'shipped',
      name: 'DB Architecture', subtitle: 'Index & Tuning',
      desc: 'Desain dan optimasi arsitektur PostgreSQL & MySQL — indexing, normalization, dan query tuning untuk memastikan skalabilitas dan reliability.',
      tech: ['PostgreSQL', 'MySQL', 'Indexing', 'Query tuning'],
      metric: '45×', metricLabel: 'query speedup',
      filters: ['backend'],
    },
  ],

  filters: ['all', 'saas', 'backend', 'frontend', 'devops', 'migration'],

  // Reagents — tech stack as compounds in vials
  reagents: [
    { sym: 'Nd', name: 'Node.js',     pct: 96, group: 'runtime',  no: '01' },
    { sym: 'Ex', name: 'Express',     pct: 92, group: 'runtime',  no: '02' },
    { sym: 'Lr', name: 'Laravel',     pct: 88, group: 'runtime',  no: '03' },
    { sym: 'Ph', name: 'PHP',         pct: 85, group: 'runtime',  no: '04' },
    { sym: 'Ts', name: 'TypeScript',  pct: 94, group: 'lang',     no: '05' },
    { sym: 'Js', name: 'JavaScript',  pct: 96, group: 'lang',     no: '06' },
    { sym: 'Rx', name: 'React',       pct: 95, group: 'frontend', no: '07' },
    { sym: 'Nx', name: 'Next.js',     pct: 93, group: 'frontend', no: '08' },
    { sym: 'Tw', name: 'Tailwind',    pct: 90, group: 'frontend', no: '09' },
    { sym: 'Pg', name: 'PostgreSQL',  pct: 94, group: 'data',     no: '10' },
    { sym: 'My', name: 'MySQL',       pct: 88, group: 'data',     no: '11' },
    { sym: 'Mo', name: 'MongoDB',     pct: 80, group: 'data',     no: '12' },
    { sym: 'Rd', name: 'Redis',       pct: 82, group: 'data',     no: '13' },
    { sym: 'Dk', name: 'Docker',      pct: 90, group: 'ops',      no: '14' },
    { sym: 'Gh', name: 'GH Actions',  pct: 88, group: 'ops',      no: '15' },
    { sym: 'Aw', name: 'AWS',         pct: 84, group: 'ops',      no: '16' },
    { sym: 'Lx', name: 'Linux',       pct: 86, group: 'ops',      no: '17' },
    { sym: 'Ng', name: 'Nginx',       pct: 84, group: 'ops',      no: '18' },
  ],

  reagentGroups: {
    runtime:  { label: 'RUNTIME',     hue: 220 },
    lang:     { label: 'LANGUAGE',    hue: 28  },
    frontend: { label: 'FRONTEND',    hue: 196 },
    data:     { label: 'DATA',        hue: 270 },
    ops:      { label: 'OPS · CLOUD', hue: 142 },
  },

  // Lab readings — gauges & meters
  readings: [
    { label: 'Years operational',   value: 5,    unit: 'YRS',   max: 10,  fmt: 'int' },
    { label: 'Production uptime',   value: 99.9, unit: '%',     max: 100, fmt: 'pct' },
    { label: 'Avg. p50 response',   value: 42,   unit: 'MS',    max: 200, fmt: 'int', inverse: true },
    { label: 'Daily active users',  value: 200,  unit: 'USR',   max: 250, fmt: 'plus' },
    { label: 'Assets managed',      value: 8000, unit: 'FILES', max: 10000, fmt: 'plus' },
    { label: 'Commits / week',      value: 47,   unit: 'CMT',   max: 60,  fmt: 'int' },
  ],

  // Procedure — process
  procedure: [
    { step: 'I',   code: 'P-01', name: 'DISCOVERY',    sub: 'audit · listen',  desc: 'Audit sistem existing, pahami constraint bisnis, identifikasi bottleneck yang nyata.', dur: '~ 1 minggu' },
    { step: 'II',  code: 'P-02', name: 'ARCHITECTURE', sub: 'design · plan',   desc: 'Tech proposal dengan diagram, milestone, dan trade-off. Anda approve sebelum satu commit dibuat.',    dur: '~ 1–2 minggu' },
    { step: 'III', code: 'P-03', name: 'BUILD',        sub: 'small PRs',       desc: 'Demo mingguan, CI hijau, observability sejak hari pertama. No big-bang releases.', dur: 'iterative' },
    { step: 'IV',  code: 'P-04', name: 'HANDOFF',      sub: 'docs · no lock',  desc: 'Dokumentasi, runbook, knowledge transfer. Tim Anda yang own sistemnya. Standby 30 hari pertama.', dur: '+ 30 hari' },
  ],

  // Pricing — 3 tier
  packages: [
    {
      tier: 'TRIAL',
      designation: 'PKG-01',
      product: 'Website Responsive',
      price: 500000,
      priceFrom: true,
      cycle: '2–3 minggu',
      revisions: '2 putaran',
      pages: '5 halaman',
      tagline: 'Fondasi solid untuk bisnis yang baru online.',
      includes: [
        'Up to 5 halaman responsif',
        'SEO setup dasar (meta · OG · sitemap)',
        'Mobile-first design',
        'Form kontak + integrasi email',
        'Domain + SSL setup',
        'Hosting setup (Vercel / VPS)',
        '2 putaran revisi major',
      ],
      excludes: ['Custom backend', 'Mobile app', 'CMS dashboard'],
    },
    {
      tier: 'PROD',
      designation: 'PKG-02',
      product: 'Website + PWA',
      price: 1500000,
      priceFrom: true,
      cycle: '4–6 minggu',
      revisions: '4 putaran',
      pages: '10 halaman',
      tagline: 'Production-ready dengan offline-capable PWA + admin panel.',
      includes: [
        'Semua di TRIAL',
        'Up to 10 halaman responsif',
        'PWA installable + offline mode',
        'Push notifications',
        'Admin dashboard (CMS sederhana)',
        'Database PostgreSQL',
        'Analytics integration',
        '1 bulan maintenance gratis',
        '4 putaran revisi major',
      ],
      excludes: ['Mobile app native', 'App Store submission'],
      recommended: true,
    },
    {
      tier: 'ENTERPRISE',
      designation: 'PKG-03',
      product: 'Website + Mobile Apps',
      price: 15000000,
      priceFrom: true,
      cycle: '8–12 minggu',
      revisions: 'unlimited',
      pages: 'unlimited',
      tagline: 'Suite lengkap — web, mobile, backend, dan SLA support.',
      includes: [
        'Semua di PROD',
        'Mobile app iOS + Android (React Native)',
        'Custom backend / API',
        'App Store + Play Store submission',
        '3 bulan maintenance gratis',
        'SLA support 99% uptime',
        'Custom integrations',
        'Performance audit + optimization',
        'Dedicated Slack channel',
      ],
      excludes: [],
    },
  ],

  // Quote calculator
  calculator: {
    base: { TRIAL: 500000, PROD: 1500000, ENTERPRISE: 15000000 },
    addons: [
      { id: 'extraPages',  label: 'Halaman tambahan',          unit: '/ halaman', price: 150000,   max: 20, step: 1 },
      { id: 'cms',         label: 'Custom CMS dashboard',      unit: '',          price: 1500000,  toggle: true },
      { id: 'i18n',        label: 'Multi-bahasa (EN/ID)',      unit: '',          price: 500000,   toggle: true },
      { id: 'auth',        label: 'Auth + user accounts',      unit: '',          price: 1000000,  toggle: true },
      { id: 'payments',    label: 'Payment gateway (Midtrans)', unit: '',         price: 1500000,  toggle: true },
      { id: 'analytics',   label: 'Analytics + dashboard',     unit: '',          price: 750000,   toggle: true },
      { id: 'aiAgents',    label: 'AI agents (Claude)',        unit: '',          price: 3000000,  toggle: true },
      { id: 'maintenance', label: 'Maintenance retainer',      unit: '/ bulan',   price: 750000,   max: 12, step: 1 },
    ],
  },

  // FAQ
  faq: [
    {
      q: 'Berapa lama proses pengerjaan biasanya?',
      a: 'Tergantung tier. TRIAL: 2–3 minggu. PROD: 4–6 minggu. ENTERPRISE: 8–12 minggu. Saya kerjakan dalam fase mingguan dengan demo rutin, jadi Anda selalu tahu posisi project.',
    },
    {
      q: 'Bagaimana sistem pembayarannya?',
      a: 'DP 40% di awal, 30% saat fase build mulai, 30% saat handoff. Pembayaran via transfer bank atau invoice resmi. Untuk ENTERPRISE bisa diatur milestone-based.',
    },
    {
      q: 'Apakah ada garansi setelah project selesai?',
      a: 'Ya. Bug fixing gratis 30 hari pertama untuk semua tier. PROD include 1 bulan maintenance gratis, ENTERPRISE 3 bulan. Setelah itu opsional retainer Rp 2.5jt/bulan.',
    },
    {
      q: 'Stack apa yang Anda pakai?',
      a: 'Default: Next.js + Node.js + PostgreSQL + Docker. Untuk mobile pakai React Native. Bisa adjust ke Laravel/PHP kalau infrastruktur Anda sudah ada di sana.',
    },
    {
      q: 'Bisa hanya backend/API saja tanpa frontend?',
      a: 'Bisa. Saya bangun API + dokumentasi (OpenAPI/Postman collection) untuk diintegrasi tim frontend Anda. Harga dihitung custom — silakan kontak.',
    },
    {
      q: 'Apakah saya mendapat source code-nya?',
      a: 'Tentu. 100% source code Anda yang punya, dengan dokumentasi lengkap, runbook deployment, dan akses repo. No vendor lock-in.',
    },
    {
      q: 'Bagaimana proses revisi?',
      a: 'Tiap fase ada demo + window revisi. Revisi minor tidak dihitung. Revisi major (perubahan scope) ada batasannya per tier. Di luar itu kita re-scope dengan transparan.',
    },
    {
      q: 'Bisa NDA / kontrak formal?',
      a: 'Bisa. Saya rutin sign NDA untuk klien enterprise. Kontrak SPK / MSA pun tersedia — template saya bisa disesuaikan.',
    },
  ],

  // Booking slots
  booking: {
    note: 'Sesi konsultasi 30 menit · Google Meet · gratis',
    slots: [
      { day: 'SEN', date: '26 MEI', time: '10:00', avail: false },
      { day: 'SEL', date: '27 MEI', time: '14:00', avail: true  },
      { day: 'RAB', date: '28 MEI', time: '10:00', avail: true  },
      { day: 'KAM', date: '29 MEI', time: '15:30', avail: true  },
      { day: 'JUM', date: '30 MEI', time: '10:00', avail: false },
      { day: 'SEN', date: '02 JUN', time: '14:00', avail: true  },
    ],
  },

  // GitHub
  github: {
    user: 'Adi-Sumardi',
    contributionsYear: 642,
    pinned: [
      { name: 'asset-vault',     desc: 'Digital asset management — Next.js + Node + PostgreSQL', stars: 28, lang: 'TypeScript', langColor: '#3178c6' },
      { name: 'ops-api',         desc: 'REST API with JWT, RBAC, reporting',                     stars: 14, lang: 'JavaScript', langColor: '#f1e05a' },
      { name: 'pipeline-refit',  desc: 'GH Actions + Docker templates',                          stars:  9, lang: 'YAML',       langColor: '#cb171e' },
      { name: 'pg-tuning-notes', desc: 'Postgres index strategies from real systems',            stars: 21, lang: 'SQL',        langColor: '#dad8d8' },
    ],
  },

  // Testimonials
  testimonials: [
    {
      quote: 'Saya udah lama nyari fullstack yang ngerti backend, bukan cuma frontend yang ngaku-ngaku bisa Node. Adi paham trade-off arsitektur, paham kenapa pilih Postgres ketimbang Mongo, dan nggak takut bilang “ini approach-nya salah, kita ulang”. Migrasi yang awalnya saya kira makan 4 bulan beres 2.5 bulan — dan deploy-nya tenang. Itu yang paling penting buat saya.',
      name: 'Engineering Manager', role: 'B2B SaaS · nama disamarkan', initials: 'EM',
    },
    {
      quote: 'Yang bikin saya nyaman kerja sama Adi: dia nggak pernah janji yang nggak bisa ditepati. Pas scope creep, dia langsung bilang “ini bakal delay 2 minggu ya, oke?” — transparan dari awal. Dashboard yang dia bangun sekarang jalan sendiri tanpa intervensi: source code rapi, dokumentasi lengkap, hand-off-nya proper.',
      name: 'Product Lead', role: 'Internal SaaS Operations', initials: 'PL',
    },
    {
      quote: 'Adi tuh kalau review PR saya, bukan cuma kasih “LGTM” atau “rejected”. Dia tanya “kenapa pakai pattern ini? coba lihat alternative X”. Waktu itu saya masih junior — banyak banget yang saya pelajari dari satu siklus kerja bareng dia. Pipeline CI/CD yang dia setup di proyek itu masih dipakai tim sampai sekarang.',
      name: 'Sr. Backend Engineer', role: 'Reporting team · dulu junior', initials: 'SB',
    },
  ],
};

window.LAB_FMT = {
  idr: (n) => 'Rp ' + (n || 0).toLocaleString('id-ID'),
  idrShort: (n) => {
    if (n >= 1_000_000) return 'Rp ' + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + 'jt';
    if (n >= 1_000) return 'Rp ' + (n / 1_000).toFixed(0) + 'rb';
    return 'Rp ' + n;
  },
};
