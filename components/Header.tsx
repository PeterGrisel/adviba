'use client';

import { MapPin, PhoneCall } from 'lucide-react';
import { brand } from '@/data/configurator';
import { BrandMark } from './BrandMark';
import { useBrandTheme } from './BrandTheme';

export function Header() {
  const { brand: active } = useBrandTheme();
  const dim = (b: string) => (active === b ? '' : 'opacity-60');
  return (
    <header className="sticky top-0 z-30 border-b border-dark-line bg-dark text-dark-fg">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#"
          className="flex items-center gap-3"
          aria-label={`${brand.name} ${brand.suffix}, naar de homepage`}
        >
          <BrandMark className="h-10 w-12" variant={active} onDark />
          <span className="flex flex-col leading-[1.05]">
            <span className="font-display text-[19px] font-semibold tracking-tight text-dark-fg md:text-[21px]">
              maas <span className="font-slab italic font-normal text-accent-bright transition-colors duration-500">
                en
              </span>{' '}
              waal
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] md:text-[12px]">
              <span className={`text-[#f5a623] transition-opacity duration-500 ${dim('zonwering')}`}>Zonwering</span>
              <span className="text-dark-fg-muted/60">·</span>
              <span className={`text-brand-orange transition-opacity duration-500 ${dim('rolluiken')}`}>Rolluiken</span>
              <span className="text-dark-fg-muted/60">·</span>
              <span className={`text-brand-green transition-opacity duration-500 ${dim('horren')}`}>Horren</span>
            </span>
          </span>
        </a>

        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-1.5 text-[13px] italic text-dark-fg/75 lg:inline-flex font-slab">
            <MapPin className="h-3.5 w-3.5 text-accent-bright" strokeWidth={1.75} />
            {brand.tagline}
          </span>
          <a
            href={brand.helpPhoneHref}
            aria-label={brand.helpCta}
            className="group inline-flex h-10 w-10 flex-none items-center justify-center gap-2 rounded-full border border-accent-bright/50 bg-dark-deep sm:h-auto sm:w-auto sm:px-3.5 sm:py-2 text-[13px] text-dark-fg transition-all hover:border-accent-bright hover:shadow-warm"
          >
            <PhoneCall className="h-4 w-4 text-accent-bright sm:h-3.5 sm:w-3.5" strokeWidth={1.75} />
            <span className="hidden whitespace-nowrap font-medium sm:inline">{brand.helpCta}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
