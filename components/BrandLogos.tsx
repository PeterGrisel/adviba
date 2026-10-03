import Image from 'next/image';

/** Merken die adviba levert en monteert (logo's van adviba.nl). */
const logos: { name: string; file: string; w: number; h: number; href?: string; size?: string }[] = [
  { name: 'Somfy', file: 'somfy', w: 268, h: 76, href: 'https://www.somfy.nl/experts/adviba-dreumel.html' },
  { name: 'Unilux', file: 'unilux', w: 278, h: 91, href: 'https://www.unilux.nl/dealers/57793/?pd=57793' },
  { name: 'VELUX', file: 'velux', w: 286, h: 100 },
  { name: 'Erfal', file: 'erfal', w: 245, h: 72, href: 'https://www.erfal.de/nl/dealer-vinden?q=druten&country=NL' },
  { name: 'Lewens Markisen', file: 'lewens', w: 247, h: 114 },
  { name: 'BiRoll', file: 'biroll', w: 261, h: 95 },
  { name: 'Husol', file: 'husol', w: 320, h: 47, size: 'h-3.5 md:h-4' },
  { name: 'SolFaction', file: 'solfaction', w: 300, h: 75 },
];

export function BrandLogos() {
  return (
    <div className="mt-10 border-t border-line pt-6 md:mt-12">
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted md:text-left">
        Officieel dealer van o.a.
      </p>
      <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5 md:justify-start md:gap-3">
        {logos.map((l) => {
          const img = (
            <Image
              src={`/brands/${l.file}.png`}
              alt={l.name}
              width={l.w}
              height={l.h}
              sizes="120px"
              className={`${l.size ?? 'h-6 md:h-7'} w-auto object-contain transition duration-300 md:opacity-80 md:grayscale md:group-hover:opacity-100 md:group-hover:grayscale-0`}
            />
          );
          const box =
            'group flex h-11 items-center rounded-xl border border-line bg-white px-3.5 transition-colors hover:border-ink/25 md:h-12';
          return (
            <li key={l.file}>
              {l.href ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  title={`adviba is dealer van ${l.name}`}
                  className={box}
                >
                  {img}
                </a>
              ) : (
                <span className={box} title={l.name}>
                  {img}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
