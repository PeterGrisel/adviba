import { brand, productOrder, products, region } from '@/data/configurator';
import { siteName, siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

// llms.txt — beknopte, feitelijke samenvatting voor AI-assistenten.
export function GET() {
  const lines = [
    `# ${siteName}`,
    '',
    `> Regionale configurator van ${brand.founder} voor zonwering, rolluiken en horren in het ${region.name} (${region.villages[0]} tot ${region.villages[region.villages.length - 1]}). Bereken online een indicatieve prijs; inmeting en montage door ${brand.founder}.`,
    '',
    '## Bedrijf',
    `- Naam: ${brand.founder}`,
    `- Adres: ${brand.address}, ${brand.postalCity}`,
    `- Telefoon: ${brand.helpPhone}`,
    `- E-mail: ${brand.email}`,
    `- Bereikbaar: ${brand.hours}; ${brand.showroom.toLowerCase()}`,
    `- Website: ${brand.website}`,
    '',
    '## Producten (vanaf-prijzen incl. btw, indicatief)',
    ...productOrder.map((id) => `- ${products[id].name}: vanaf € ${products[id].basePrice}. ${products[id].description}`),
    '',
    '## Werkgebied',
    region.villages.join(', '),
    '',
    '## Links',
    `- [Prijs berekenen](${siteUrl}/#configureer)`,
    `- [Showroomafspraak](${brand.appointmentUrl})`,
  ];
  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
