export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://adilabs.id/#organization",
    name: "AdiLabs.id",
    url: "https://adilabs.id",
    logo: "https://adilabs.id/og-image.png",
    image: "https://adilabs.id/og-image.png",
    description:
      "Jasa pembuatan website dan aplikasi profesional. Konsultasi gratis dengan AI 24/7. Spesialis React, Next.js, Node.js, dan integrasi AI.",
    priceRange: "Rp 2.000.000 - Rp 150.000.000",
    telephone: "+6285121379697",
    email: "adisumardi888@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressRegion: "Indonesia",
    },
    areaServed: [
      { "@type": "Country", name: "Indonesia" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Malaysia" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "Country", name: "Philippines" },
      { "@type": "Country", name: "Vietnam" },
      { "@type": "Country", name: "Thailand" },
    ],
    sameAs: [
      "https://github.com/Adi-Sumardi",
      "https://www.linkedin.com/in/adi-sumardi-9037b0156/",
      "https://instagram.com/_adi1508",
      "https://www.facebook.com/adi.sumardi888/",
      "https://wa.me/6285121379697",
    ],
    founder: {
      "@type": "Person",
      name: "Adi Sumardi",
      jobTitle: "Fullstack Developer",
      url: "https://adilabs.id",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Jasa Pembuatan Website & Aplikasi",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing Page / Company Profile",
            description: "Pembuatan website company profile modern, responsif, dan SEO-friendly",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "3000000",
            priceCurrency: "IDR",
            minPrice: "3000000",
            maxPrice: "8000000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Application Development",
            description: "Pembuatan aplikasi web custom dengan React, Next.js, dan Node.js",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "10000000",
            priceCurrency: "IDR",
            minPrice: "10000000",
            maxPrice: "150000000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "Pembuatan aplikasi mobile dengan React Native dan Flutter",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "15000000",
            priceCurrency: "IDR",
            minPrice: "15000000",
            maxPrice: "80000000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Integration",
            description: "Integrasi kecerdasan buatan untuk automasi dan document processing",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "10000000",
            priceCurrency: "IDR",
            minPrice: "10000000",
            maxPrice: "50000000",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://adilabs.id/#website",
    name: "AdiLabs.id - Jasa Pembuatan Website & Aplikasi",
    url: "https://adilabs.id",
    description:
      "Jasa pembuatan website dan aplikasi profesional dengan konsultasi AI gratis 24/7. Mulai dari Rp 3 juta.",
    publisher: { "@id": "https://adilabs.id/#organization" },
    inLanguage: ["id-ID", "en-US", "ar"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Berapa harga jasa pembuatan website di AdiLabs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harga jasa pembuatan website di AdiLabs mulai dari Rp 3.000.000 untuk landing page/company profile, Rp 10.000.000 - 25.000.000 untuk web app sederhana (3-5 fitur), Rp 25.000.000 - 50.000.000 untuk web app menengah, dan Rp 50.000.000 - 150.000.000 untuk enterprise. Konsultasi gratis via AI chatbot 24/7.",
        },
      },
      {
        "@type": "Question",
        name: "Teknologi apa yang digunakan AdiLabs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AdiLabs menggunakan teknologi modern seperti React, Next.js, TypeScript, Node.js, Python, PostgreSQL, MongoDB, Docker, AWS, serta integrasi AI/ML dengan TensorFlow dan LLM. Kami juga mengembangkan mobile app dengan React Native dan Flutter.",
        },
      },
      {
        "@type": "Question",
        name: "Berapa lama proses pembuatan website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Landing page/company profile: 1-2 minggu. Web app sederhana: 2-4 minggu. Web app menengah: 1-2 bulan. Enterprise app: 2-6 bulan. Timeline tergantung kompleksitas dan jumlah fitur. Konsultasikan kebutuhan Anda melalui AI chatbot kami untuk estimasi yang lebih akurat.",
        },
      },
      {
        "@type": "Question",
        name: "Apakah AdiLabs menyediakan jasa maintenance website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ya, AdiLabs menyediakan layanan maintenance dan support setelah project selesai. Kami juga menyediakan jasa pengembangan fitur tambahan, bug fixing, dan optimasi performa.",
        },
      },
      {
        "@type": "Question",
        name: "Bagaimana cara konsultasi di AdiLabs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Anda bisa langsung konsultasi gratis 24/7 melalui AI chatbot Personal Asisten Adi di website adilabs.id. AI kami akan membantu menganalisis kebutuhan, memberikan rekomendasi tech stack, dan estimasi harga. Anda juga bisa menghubungi langsung via WhatsApp di 085121379697 atau email adisumardi888@gmail.com.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
