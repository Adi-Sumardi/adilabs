export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adi Sumardi",
    url: "https://adilabs.id",
    image: "https://adilabs.id/profile-image.jpg",
    sameAs: [
      "https://github.com/Adi-Sumardi",
      "https://www.linkedin.com/in/adi-sumardi-9037b0156/",
      "https://instagram.com/_adi1508",
      "https://www.facebook.com/adi.sumardi888/",
    ],
    jobTitle: "Fullstack Developer",
    worksFor: {
      "@type": "Organization",
      name: "AdiLabs",
    },
    email: "adisumardi888@gmail.com",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Politeknik Negeri Batam",
    },
    knowsAbout: [
      "Web Development",
      "Fullstack Development",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Python",
      "AI Integration",
      "Machine Learning",
      "Database Design",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Flutter",
      "Laravel",
      "PHP",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AdiLabs - Adi Sumardi Portfolio",
    url: "https://adilabs.id",
    description:
      "Professional portfolio of Adi Sumardi, a fullstack developer specializing in web applications, AI integration, and enterprise solutions.",
    author: {
      "@type": "Person",
      name: "Adi Sumardi",
    },
    inLanguage: "en-US",
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AdiLabs",
    url: "https://adilabs.id",
    description:
      "Fullstack development services including web application development, AI integration, enterprise solutions, and technical consulting.",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Indonesia",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "Indonesia",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    serviceType: [
      "Web Development",
      "Mobile Development",
      "AI Integration",
      "Technical Consulting",
      "Database Architecture",
      "DevOps Services",
    ],
    provider: {
      "@type": "Person",
      name: "Adi Sumardi",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://adilabs.id",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://adilabs.id#about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projects",
        item: "https://adilabs.id#projects",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Blog",
        item: "https://adilabs.id#blog",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact",
        item: "https://adilabs.id#contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
