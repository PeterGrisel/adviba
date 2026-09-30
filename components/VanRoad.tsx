'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Leaf } from 'lucide-react';
import bus from '@/public/media/adviba-bus.webp';

// Van oost (rechts) naar west (links); de bus kijkt naar links.
const stops = [
  { name: 'Heerewaarden', at: 0.04 },
  { name: 'Dreumel', at: 0.27 },
  { name: 'Boven-Leeuwen', at: 0.5, showroom: true },
  { name: 'Druten', at: 0.73 },
  { name: 'Ewijk', at: 0.96 },
];

/**
 * Kleine adviba-bus die tijdens het scrollen over een dijkweg rijdt,
 * langs een paar kernen, met de showroom als stop. Bij reduced motion
 * staat hij stil bij de showroom.
 */
export function VanRoad() {
  const road = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const reduce = useReducedMotion();
  const vanW = trackW < 480 ? 150 : 210;

  useEffect(() => {
    const el = road.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setTrackW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: road, offset: ['start end', 'end 35%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  // rechts → links over de weg
  const x = useTransform(smooth, (p) => (1 - p) * Math.max(0, trackW - vanW));
  const staticX = Math.max(0, trackW * 0.5 - vanW / 2);

  return (
    <div className="mt-12 grid items-end gap-6 md:mt-16 md:grid-cols-[260px_1fr] md:gap-10">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3d862c]">
          <Leaf className="h-3.5 w-3.5" strokeWidth={2} />
          adviba rijdt groen
        </div>
        <p className="mt-3 font-display text-[22px] font-semibold leading-snug tracking-tight text-ink md:text-[24px]">
          We houden Maas en Waal graag{' '}
          <span className="font-slab italic font-normal text-[#3d862c]">groen.</span>
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
          Korte ritten vanuit onze showroom in Boven-Leeuwen, van Heerewaarden tot Ewijk.
        </p>
      </div>

      <div ref={road} className="relative h-[150px] md:h-[170px]" aria-hidden>
        {/* Dijkweg */}
        <div className="absolute inset-x-0 bottom-[30px] h-3 rounded-full bg-[#dcd5c3]">
          <div className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 border-t-2 border-dashed border-white/90" />
        </div>
        {/* Gras-rand */}
        <div className="absolute inset-x-0 bottom-[27px] h-3 rounded-full bg-brand-green/15" />

        {/* Kernen langs de weg */}
        {stops.map((s) => (
          <div
            key={s.name}
            className="absolute bottom-0 flex -translate-x-1/2 flex-col-reverse items-center"
            style={{ left: `${s.at * 100}%` }}
          >
            <span
              className={[
                'whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.1em]',
                s.showroom ? 'text-accent' : 'text-ink-muted/80',
                s.showroom ? '' : 'hidden sm:block',
              ].join(' ')}
            >
              {s.showroom ? 'Showroom' : s.name}
            </span>
            <span
              className={[
                'mb-1.5 h-2.5 w-2.5 rounded-full ring-2 ring-canvas',
                s.showroom ? 'bg-accent' : 'bg-brand-green/60',
              ].join(' ')}
            />
          </div>
        ))}

        {/* De bus */}
        {trackW > 0 && (
          <motion.div
            className="absolute bottom-[37px] left-0 will-change-transform"
            style={{ x: reduce ? staticX : x, width: vanW }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -1.2, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={bus}
                alt=""
                sizes="210px"
                className="h-auto w-full drop-shadow-[0_6px_6px_rgba(51,54,59,0.25)]"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
