import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import { LanguageInit } from "@/components/LanguageProvider";
import JsonLd from "@/components/JsonLd";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}var l=localStorage.getItem('lang');if(l==='ne'){document.documentElement.classList.add('lang-pending')}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: "Harikrishna Gautam" }],
  keywords: [
    "Harikrishna Gautam",
    "Software Developer Nepal",
    "Full Stack Developer Nepal",
    "Web Developer Nepal",
    "React Developer Nepal",
    "Next.js Developer Nepal",
    "ASP.NET Developer Nepal",
    ".NET Developer Nepal",
    "C# Developer",
    "SQL Server Developer",
    "AWS Developer",
    "Microsoft Azure Developer",
    "Cloud Developer",
    "Cybersecurity Enthusiast",
    "Secure Software Development",
    "Portfolio Website",
  ],
  applicationName: siteName,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@hrkshnagtm",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>
        <JsonLd />
        <LanguageInit />
        {children}
      </body>
    </html>
  );
}
