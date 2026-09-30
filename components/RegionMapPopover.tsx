'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { brand, region } from '@/data/configurator';
import { useBrandTheme } from './BrandTheme';
import { NLMapIcon } from './NLMapIcon';

// Kaartbibliotheek pas laden als het paneel opent
const RegionMap = dynamic(() => import('./RegionMap').then((m) => m.RegionMap), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center bg-canvas text-[13px] text-ink-muted">
      Kaart laden…
    </div>
  ),
});

/** "Van Heerewaarden tot Ewijk" in de header, opent een regiokaart. */
export function RegionMapPopover() {
  const [open, setOpen] = useState(false);
  const { brand: active } = useBrandTheme();
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  // Vooraf laden bij hover, zodat openen direct voelt
  const prefetch = () => void import('./RegionMap');

  return (
    <div ref={wrap} className="relative">
      {/* Desktop: tekstlink */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={prefetch}
        onFocus={prefetch}
        aria-expanded={open}
        aria-controls="regiokaart"
        className="group hidden items-center gap-2.5 rounded-xl px-2 py-1 text-left text-dark-fg/80 transition-colors hover:text-dark-fg lg:inline-flex"
      >
        <NLMapIcon className="h-8 w-7 flex-none text-dark-fg transition-transform duration-300 group-hover:scale-110" />
        <span className="flex flex-col leading-tight">
          <span className="font-slab text-[13px] italic">{brand.tagline}</span>
          <span className="mt-0.5 inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent-bright">
            Bekijk werkregio
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
          </span>
        </span>
      </button>
      {/* Mobiel/tablet: icoonknop */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onTouchStart={prefetch}
        aria-expanded={open}
        aria-controls="regiokaart"
        aria-label={`Bekijk werkregio: ${brand.tagline}`}
        className="grid h-10 w-10 place-items-center rounded-full border border-dark-line bg-dark-deep text-accent-bright transition-colors hover:border-accent-bright lg:hidden"
      >
        <NLMapIcon className="h-6 w-5 text-dark-fg" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="regiokaart"
            role="dialog"
            aria-label="Werkgebied Maas en Waal"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            className="fixed left-3 right-3 top-[84px] z-40 origin-top overflow-hidden rounded-card border border-line bg-surface text-ink shadow-elevated lg:absolute lg:left-auto lg:right-0 lg:top-full lg:mt-3 lg:w-[460px] lg:origin-top-right"
          >
            <div className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
              <div>
                <div className="font-display text-[16px] font-semibold tracking-tight">
                  Ons werkgebied
                </div>
                <div className="mt-0.5 text-[12.5px] text-ink-muted">
                  {region.villages.length} kernen in het {region.name}, van {region.villages[0]}{' '}
                  tot {region.villages[region.villages.length - 1]}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Kaart sluiten"
                className="grid h-8 w-8 flex-none place-items-center rounded-full text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            <div className="h-[280px] border-y border-line sm:h-[300px]">
              <RegionMap brandKey={active} />
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3 text-[12.5px]">
              <span className="inline-flex items-center gap-2 text-ink-muted">
                <span className="region-map-showroom region-map-showroom--static" aria-hidden />
                Showroom {brand.postalCity.slice(8)}, {brand.showroom.toLowerCase()}
              </span>
              <a
                href="#configureer"
                onClick={() => setOpen(false)}
                className="whitespace-nowrap font-semibold text-accent hover:underline"
              >
                Bereken je prijs
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
