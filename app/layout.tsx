import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { PlausibleAnalytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdiLabs.id | Professional Web & App Development Services",
  description: "Professional web development, mobile apps & AI integration services. Free 24/7 AI consultation. Specializing in React, Next.js, Node.js. Serving clients worldwide — Indonesia, USA, UK, Middle East & beyond.",
  keywords: [
    // English - International
    "web development services",
    "hire web developer",
    "custom web application",
    "mobile app development",
    "fullstack developer",
    "AI integration services",
    "React developer for hire",
    "Next.js development agency",
    "Node.js developer",
    "affordable web development",
    "professional web developer",
    "custom software development",
    "enterprise web application",
    "freelance developer",
    // Indonesian
    "jasa pembuatan website",
    "jasa pembuatan aplikasi",
    "jasa web developer Indonesia",
    "jasa bikin website murah",
    "jasa pembuatan web app",
    "jasa integrasi AI",
    "joki aplikasi",
    "buat website company profile",
    // Arabic
    "تطوير مواقع الويب",
    "خدمات تطوير التطبيقات",
    "مطور ويب محترف",
    // Brand
    "Adi Sumardi",
    "AdiLabs",
  ],
  authors: [{ name: "Adi Sumardi", url: "https://adilabs.id" }],
  creator: "Adi Sumardi",
  publisher: "AdiLabs.id",
  metadataBase: new URL("https://adilabs.id"),
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/",
      "ar": "/",
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID", "ar_SA"],
    url: "https://adilabs.id",
    title: "AdiLabs.id | Professional Web & App Development Services",
    description: "Professional web & app development with free 24/7 AI consultation. React, Next.js, Node.js, AI Integration. Serving clients worldwide.",
    siteName: "AdiLabs.id",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AdiLabs.id - Professional Web & App Development Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AdiLabs.id | Professional Web & App Development",
    description: "Professional web & app development services. Free 24/7 AI consultation. Serving clients in Indonesia, USA, UK, Middle East & worldwide.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <JsonLd />
        <PlausibleAnalytics domain="adilabs.id" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
