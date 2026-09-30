'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { brand } from '@/data/configurator';
import { AdvibaLogo } from './AdvibaLogo';

/**
 * Zwevende "onderdeel van adviba"-kaart rechtsonder (desktop). Verschijnt
 * na een korte vertraging en verdwijnt zodra de footer in beeld komt,
 * want daar staat het logo al. Op mobiel verborgen: daar zou hij knoppen
 * in de configurator afdekken.
 */
export function AdvibaFloater() {
  const [ready, setReady] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900);
    const footer = document.querySelector('footer');
    const io = footer
      ? new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting), {
          rootMargin: '0px 0px -80px 0px',
        })
      : null;
    if (footer && io) io.observe(footer);
    return () => {
      clearTimeout(t);
      io?.disconnect();
    };
  }, []);

  const show = ready && !footerVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={brand.website}
          target="_blank"
          rel="noopener"
          aria-label="adviba daglichtoplossingen, showroom in Boven-Leeuwen (opent adviba.nl)"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-2xl border border-line bg-surface py-2.5 pl-3 pr-3.5 text-ink shadow-elevated transition-shadow hover:shadow-warm md:flex"
        >
          <span className="flex flex-col leading-tight">
            <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-muted">
              Onderdeel van
            </span>
            <span className="mt-1">
              <AdvibaLogo className="h-6" linked={false} plate={false} />
            </span>
          </span>
          <span className="h-9 w-px bg-line" aria-hidden />
          <span className="flex flex-col leading-tight">
            <span className="text-[12.5px] font-semibold text-ink">Lokaal vakmanschap</span>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[12px] text-ink-muted transition-colors group-hover:text-accent">
              Showroom Boven-Leeuwen
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
