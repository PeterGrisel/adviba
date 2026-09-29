/**
 * Canonieke basis-URL. Zet NEXT_PUBLIC_SITE_URL (bijv.
 * https://www.maasenwaalzonwering.nl) zodra het hoofddomein live staat;
 * tot die tijd valt hij terug op het productiedomein dat Vercel meegeeft.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

export const siteName = 'Maas en Waal Zonwering · Rolluiken · Horren';
export const siteTitle = 'Zonwering, rolluiken & horren in Maas en Waal | adviba';
export const siteDescription =
  'Screens, rolluiken en horren op maat in Maas en Waal, van Heerewaarden tot Ewijk. Bereken je prijs in 2 minuten; inmeting en montage door adviba.';
