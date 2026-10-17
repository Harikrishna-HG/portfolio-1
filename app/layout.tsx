import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import { LanguageInit } from "@/components/LanguageProvider";
import { siteName, siteUrl } from "@/lib/site";
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
  title: "Harikrishna Gautam | Portfolio",
  description:
    "Portfolio of Harikrishna Gautam — full stack developer and software engineer building modern web applications.",
  authors: [{ name: "Harikrishna Gautam" }],
  keywords: [
    "Harikrishna Gautam",
    "portfolio",
    "full stack developer",
    "software engineer",
    "web developer",
  ],
  applicationName: siteName,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Harikrishna Gautam | Portfolio",
    description:
      "Portfolio of Harikrishna Gautam — full stack developer and software engineer.",
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harikrishna Gautam | Portfolio",
    description:
      "Portfolio of Harikrishna Gautam — full stack developer and software engineer.",
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
        <LanguageInit />
        {children}
      </body>
    </html>
  );
}
