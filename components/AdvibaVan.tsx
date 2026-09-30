import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Leaf } from 'lucide-react';

const CANDIDATES = ['adviba-bus.webp', 'adviba-bus.png', 'adviba-bus.jpg'];

/**
 * "adviba rijdt groen!" met de bedrijfsbus, bovenin de footer. Verschijnt
 * zodra public/media/adviba-bus.(webp|png|jpg) bestaat.
 */
export function AdvibaVan() {
  const dir = path.join(process.cwd(), 'public', 'media');
  const file = CANDIDATES.find((f) => fs.existsSync(path.join(dir, f)));
  if (!file) return null;

  return (
    <div className="border-b border-dark-line">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 pb-4 pt-10 md:grid-cols-[1fr_1.1fr] md:gap-10 md:px-8 md:pt-12">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-green">
            <Leaf className="h-3.5 w-3.5" strokeWidth={2} />
            Duurzaam onderweg
          </div>
          <h2 className="mt-4 font-display text-[28px] font-semibold leading-tight tracking-tight md:text-[36px]">
            adviba rijdt <span className="text-brand-green">groen!</span>
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-dark-fg/75">
            Met onze bus komen we inmeten, adviseren en monteren door heel Maas en Waal. Lokaal,
            dus korte ritten.
          </p>
        </div>
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-6 bottom-2 h-6 rounded-[50%] bg-black/50 blur-xl"
            aria-hidden
          />
          <Image
            src={`/media/${file}`}
            alt="Bedrijfsbus van adviba, daglichtoplossingen"
            width={1774}
            height={887}
            sizes="(min-width: 768px) 560px, 100vw"
            className="relative mx-auto h-auto w-full max-w-[560px]"
          />
        </div>
      </div>
    </div>
  );
}
