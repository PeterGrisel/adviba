import localImages from './localImages.json';

/**
 * Externe beelden. Tijdens de build haalt `scripts/fetch-images.mjs` ze op
 * naar /public/img, zodat Vercel ze zelf serveert en optimaliseert (AVIF/WebP)
 * i.p.v. per bezoek via de trage Wikimedia-redirect. Lukt dat niet, dan valt
 * `imageSrc` terug op de externe URL.
 */
export const remoteImages = {
  'waal-beneden-leeuwen': commons('De_Waal_bij_Beneden_Leeuwen_-_panoramio.jpg'),
  'waaldijk-dreumel': commons('Van_af_de_Waaldijk_zien_we_het_dorp_Dreumel.jpg'),
  'dreumelsche-waard': commons('Dreumelsche_Waard.jpg'),
  'waalbandijk-dreumel': commons('Dreumel_op_de_Waalbandijk_in_Het_Land_van_Maas_en_Waal.jpg'),
  'dreumel-kerk': commons('Dreumel_kerk,_Nederland.jpg'),
  'adviba-logo': 'https://www.adviba.nl/wp-content/uploads/2021/04/Logo-Adviba-1536x500.png',
} as const;

export type ImageKey = keyof typeof remoteImages;

function commons(file: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=2400`;
}

export function imageSrc(key: ImageKey): string {
  return (localImages as Record<string, string>)[key] ?? remoteImages[key];
}
