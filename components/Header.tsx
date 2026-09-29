'use client';

import { MapPin, PhoneCall } from 'lucide-react';
import { brand } from '@/data/configurator';
import { BrandMark } from './BrandMark';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-dark-line bg-dark text-dark-fg">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#"
          className="flex items-center gap-3"
          aria-label={`${brand.name} ${brand.suffix} — home`}
        >
          <BrandMark className="h-10 w-12" onDark />
          <span className="flex flex-col leading-[1.05]">
            <span className="font-display text-[19px] font-semibold tracking-tight text-dark-fg md:text-[21px]">
              maas <span className="font-slab italic font-normal text-accent-bright">
                en
              </span>{' '}
              waal
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] md:text-[12px]">
              <span className="text-accent-bright">Zonwering</span>
              <span className="text-dark-fg-muted/60">·</span>
              <span className="text-brand-orange">Rolluiken</span>
              <span className="text-dark-fg-muted/60">·</span>
              <span className="text-brand-green">Horren</span>
            </span>
          </span>
        </a>

        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-1.5 text-[13px] italic text-dark-fg-muted md:inline-flex font-slab">
            <MapPin className="h-3.5 w-3.5 text-accent-bright" strokeWidth={1.75} />
            {brand.tagline}
          </span>
          <a
            href={`tel:${brand.helpPhone.replace(/\s|\(|\)/g, '')}`}
            className="group inline-flex items-center gap-2 rounded-full border border-dark-line bg-dark-deep px-3.5 py-2 text-[13px] text-dark-fg transition-all hover:border-accent-bright hover:shadow-warm"
          >
            <PhoneCall className="h-3.5 w-3.5 text-accent-bright" strokeWidth={1.75} />
            <span className="font-medium">{brand.helpCta}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
