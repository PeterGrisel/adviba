import { brand, productOrder, products, region } from '@/data/configurator';
import { siteName, siteUrl } from '@/lib/site';

/**
 * JSON-LD voor zoekmachines en AI-assistenten: wie (adviba), waar
 * (werkgebied Maas en Waal), wat (diensten + vanaf-prijzen).
 * adviba is het bedrijf; deze site is haar regionale configurator.
 */
export function StructuredData() {
  const businessId = `${siteUrl}/#adviba`;
  const brandLabels = ['Maas en Waal Zonwering', 'Maas en Waal Rolluiken', 'Maas en Waal Horren'];
  const areaServed = region.villages.map((name) => ({ '@type': 'City', name }));

  const graph = [
    {
      '@type': 'HomeAndConstructionBusiness',
      '@id': businessId,
      name: brand.founder,
      // De drie streeklabels zijn merken van adviba en landen op deze configurator.
      alternateName: brandLabels,
      brand: brandLabels.map((name) => ({ '@type': 'Brand', name })),
      url: brand.website,
      telephone: brand.helpPhoneHref.replace('tel:', ''),
      email: brand.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: brand.address,
        postalCode: brand.postalCity.slice(0, 7),
        addressLocality: brand.postalCity.slice(8),
        addressCountry: 'NL',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      areaServed,
      sameAs: brand.socials,
      knowsAbout: ['Zonwering', 'Screens', 'Rolluiken', 'Horren', 'Terrasoverkappingen'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      inLanguage: 'nl-NL',
      publisher: { '@id': businessId },
    },
    ...productOrder.map((id) => {
      const p = products[id];
      return {
        '@type': 'Service',
        '@id': `${siteUrl}/#${id}`,
        name: `${p.name} in ${region.name}`,
        serviceType: p.name,
        description: p.description,
        provider: { '@id': businessId },
        areaServed,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'EUR',
          lowPrice: p.basePrice,
          description: 'Vanaf-prijs incl. btw; indicatief, definitieve prijs na gratis inmeting.',
          url: `${siteUrl}/#configureer`,
        },
      };
    }),
  ];

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
          /</g,
          '\\u003c'
        ),
      }}
    />
  );
}
