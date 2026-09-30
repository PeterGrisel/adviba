'use client';

import { brand } from '@/data/configurator';
import { BrandMark } from './BrandMark';
import { useBrandTheme } from './BrandTheme';
import { RegionMapPopover } from './RegionMapPopover';
import { WhatsAppIcon, whatsappHref } from './WhatsApp';

export function Header() {
  const { brand: active } = useBrandTheme();
  const dim = (b: string) => (active === b ? '' : 'opacity-60');
  return (
    <header className="sticky top-0 z-30 border-b border-dark-line bg-dark text-dark-fg">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-5 md:px-8">
        <a
          href="#"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
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
            <span className="mt-0.5 flex items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] md:text-[12px]">
              <span className={`text-[#f5a623] transition-opacity duration-500 ${dim('zonwering')}`}>Zonwering</span>
              <span className="text-dark-fg-muted/60">·</span>
              <span className={`text-brand-orange transition-opacity duration-500 ${dim('rolluiken')}`}>Rolluiken</span>
              <span className="text-dark-fg-muted/60">·</span>
              <span className={`text-brand-green transition-opacity duration-500 ${dim('horren')}`}>Horren</span>
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2 lg:gap-5">
          <RegionMapPopover />
          <a
            href={whatsappHref(active)}
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp adviba"
            className="group inline-flex h-10 w-10 flex-none items-center justify-center gap-2 rounded-full border border-[#25D366]/50 bg-dark-deep text-[13px] text-dark-fg transition-all hover:border-[#25D366] hover:shadow-[0_8px_24px_rgba(37,211,102,0.18)] sm:h-auto sm:w-auto sm:py-2 sm:pl-2.5 sm:pr-3.5"
          >
            <WhatsAppIcon className="h-5 w-5 sm:h-[18px] sm:w-[18px]" />
            <span className="hidden whitespace-nowrap font-medium sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
