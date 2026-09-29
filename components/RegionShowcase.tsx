'use client';

import { MapPin } from 'lucide-react';

interface Shot {
  file: string;
  caption: string;
  village: string;
  credit: string;
  aspect?: string; // tailwind aspect class override
}

/**
 * Regionale sfeerbeelden — vrije-licentie foto's uit Wikimedia Commons.
 * Special:FilePath geeft altijd de actuele originele bestandslocatie terug.
 */
const shots: Shot[] = [
  {
    file: 'De_Waal_bij_Beneden_Leeuwen_-_panoramio.jpg',
    caption: 'De Waal, aan de rand van',
    village: 'Beneden-Leeuwen',
    credit: 'Foto: bertknot via Panoramio, CC BY-SA 3.0',
  },
  {
    file: 'Dreumel_op_de_Waalbandijk_in_Het_Land_van_Maas_en_Waal.jpg',
    caption: 'Waalbandijk richting',
    village: 'Dreumel',
    credit: 'Foto: Wutsje via Wikimedia Commons, CC BY-SA 3.0',
  },
  {
    file: 'Dreumel_kerk,_Nederland.jpg',
    caption: 'Dorpstoren van',
    village: 'Dreumel',
    credit: 'Foto: Wikimedia Commons, CC BY-SA 4.0',
  },
];

function src(file: string, width: number): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    file
  )}?width=${width}`;
}

export function RegionShowcase() {
  return (
    <section className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-3 md:mb-14 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Uit onze streek
            </div>
            <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight tracking-tight text-ink md:text-[36px]">
              Waar wij thuis zijn —{' '}
              <span className="font-slab italic font-normal text-accent">
                tussen Maas en Waal
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-ink-muted md:text-right">
            Van de uiterwaarden bij Heerewaarden tot de dorpstorens richting Ewijk —
            elke woning die we voorzien staat in een landschap dat we van binnen kennen.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {shots.map((shot, i) => (
            <figure
              key={shot.file}
              className={[
                'group relative overflow-hidden rounded-card border border-line bg-surface',
                // Middelste beeld iets prominenter op desktop
                i === 1 ? 'md:aspect-[4/5]' : 'md:aspect-[4/5]',
                'aspect-[4/3]',
              ].join(' ')}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src(shot.file, 1200)}
                alt={`${shot.caption} ${shot.village}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />

              {/* Warme onderrand-gradient voor leesbaarheid van caption */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-surface">
                <div className="flex items-baseline gap-1.5 text-[12px] uppercase tracking-[0.14em] opacity-80">
                  <MapPin className="h-3 w-3" strokeWidth={2} />
                  {shot.caption}
                </div>
                <div className="mt-1 font-display text-[22px] font-semibold leading-tight tracking-tight md:text-[26px]">
                  {shot.village}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-[11px] leading-relaxed text-ink-muted">
          Beeld: Wikimedia Commons —{' '}
          {shots.map((s, i) => (
            <span key={s.file}>
              {i > 0 && ' · '}
              {s.credit}
            </span>
          ))}
          .
        </p>
      </div>
    </section>
  );
}
