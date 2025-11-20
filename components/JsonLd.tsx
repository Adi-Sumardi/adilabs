export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adi Sumardi",
    url: "https://adilabs.id",
    image: "https://adilabs.id/profile.jpg",
    jobTitle: "Fullstack Developer",
    worksFor: {
      "@type": "Organization",
      name: "AdiLabs",
    },
    sameAs: [
      "https://github.com/Adi-Sumardi",
      "https://www.linkedin.com/in/adi-sumardi-9037b0156/",
      "https://instagram.com/_adi1508",
      "https://www.facebook.com/adi.sumardi888/",
    ],
    email: "adisumardi888@gmail.com",
    knowsAbout: [
      "Fullstack Development",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "AI Integration",
      "Web Development",
      "Enterprise Solutions",
    ],
    description:
      "Experienced fullstack developer specializing in web applications, AI integration, and enterprise solutions. Building innovative digital experiences with modern technologies.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
