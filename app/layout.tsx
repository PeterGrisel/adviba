import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maas en Waal Zonwering & Rolluiken — configureer online',
  description:
    'Streekspecialist voor zonwering, rolluiken en terrasoverkappingen. Van Heerewaarden tot Ewijk. Prijsindicatie in 2 minuten. Persoonlijk advies van ADviba.',
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
      <body className="min-h-screen bg-canvas antialiased">{children}</body>
    </html>
  );
}
