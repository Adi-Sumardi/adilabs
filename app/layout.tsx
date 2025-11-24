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
  title: "Adi Sumardi | Fullstack Developer & Tech Enthusiast",
  description: "Experienced fullstack developer specializing in web applications, AI integration, and enterprise solutions. Building innovative digital experiences with React, Next.js, Node.js, and modern technologies.",
  keywords: [
    "fullstack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "AI integration",
    "enterprise solutions",
    "Adi Sumardi",
    "AdiLabs",
    "portfolio",
    "Indonesia developer",
  ],
  authors: [{ name: "Adi Sumardi", url: "https://adilabs.id" }],
  creator: "Adi Sumardi",
  publisher: "Adi Sumardi",
  metadataBase: new URL("https://adilabs.id"),
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adilabs.id",
    title: "Adi Sumardi | Fullstack Developer & Tech Enthusiast",
    description: "Experienced fullstack developer specializing in web applications, AI integration, and enterprise solutions.",
    siteName: "AdiLabs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adi Sumardi - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adi Sumardi | Fullstack Developer & Tech Enthusiast",
    description: "Experienced fullstack developer specializing in web applications, AI integration, and enterprise solutions.",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
