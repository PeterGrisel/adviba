/** @type {import('next').NextConfig} */
const primary = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maasenwaalzonwering.nl').replace(/\/$/, '');

// De merk-domeinen bundelen hun autoriteit op het hoofddomein (301).
const brandDomains = [
  ['maasenwaalrolluiken.nl', 'rolluiken'],
  ['maasenwaalhorren.nl', 'horren'],
];

const nextConfig = {
  async redirects() {
    return brandDomains.map(([domain, merk]) => ({
      source: '/:path*',
      has: [{ type: 'host', value: `(?:www\\.)?${domain.replace(/\./g, '\\.')}` }],
      destination: `${primary}/?merk=${merk}`,
      permanent: true,
    }));
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'commons.wikimedia.org' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.adviba.nl' },
    ],
  },
};

module.exports = nextConfig;
