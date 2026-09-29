import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { siteDescription, siteName, siteTitle, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s | ${siteName}` },
  description: siteDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: '/',
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: { card: 'summary_large_image', title: siteTitle, description: siteDescription },
  robots: { index: true, follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&family=Roboto+Slab:wght@400;500;600&display=swap"
        />
      </head>
      <body className="min-h-screen bg-canvas antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
