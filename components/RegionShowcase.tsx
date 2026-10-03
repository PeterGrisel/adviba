'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CalendarDays, Leaf, MapPin } from 'lucide-react';
import { brand } from '@/data/configurator';
import bus from '@/public/media/adviba-bus.webp';
import showroomFoto from '@/public/media/showroom-alec.jpg';
import werkplaatsFoto from '@/public/media/showroom-werkplaats.jpg';
import busOnderweg from '@/public/media/bus-onderweg.jpg';
import busHoogwerker from '@/public/media/bus-hoogwerker.jpg';

interface Shot {
  id: string;
  caption: string;
  village: string;
  photo: StaticImageData;
  /** object-position, bv. om een persoon in beeld te houden */
  focus?: string;
  alt?: string;
  showroom?: boolean;
}

/** Showroom, werkplaats en de bus onderweg: alles eigen beeld van adviba. */
const shots: Shot[] = [
  {
    id: 'showroom',
    caption: 'Onze showroom in',
    village: 'Boven-Leeuwen',
    photo: showroomFoto,
    focus: '36% 40%',
    alt: 'Alec van adviba in de showroom in Boven-Leeuwen, met stalen van zonweringsdoek',
    showroom: true,
  },
  {
    id: 'werkplaats',
    caption: 'Werkplaats aan de',
    village: 'Expeditieweg',
    photo: werkplaatsFoto,
    focus: '50% 70%',
    alt: 'Showroom en werkplaats van adviba aan de Expeditieweg in Boven-Leeuwen, met de adviba-bus voor de deur',
  },
  {
    id: 'onderweg',
    caption: 'Onderweg in',
    village: 'Maas en Waal',
    photo: busOnderweg,
    focus: '40% 60%',
    alt: 'De adviba-bus voor een woning met zonnepanelen, onderweg naar een klant',
  },
  {
    id: 'hoogwerker',
    caption: 'Aan het werk met de',
    village: 'hoogwerker',
    photo: busHoogwerker,
    focus: '30% 60%',
    alt: 'adviba aan het werk met een hoogwerker bij een nieuwbouwwoning, de bus ervoor',
  },
];

export function RegionShowcase() {
  return (
    <section className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:mb-10 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Uit onze streek
            </div>
            <h2 className="mt-4 font-display text-[26px] font-semibold leading-tight tracking-tight text-ink md:text-[36px]">
              Waar wij thuis zijn:{' '}
              <span className="font-slab italic font-normal text-accent">tussen Maas en Waal</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-ink-muted md:text-right">
            Vanuit onze showroom in Boven-Leeuwen werken we in de streek die we van binnen kennen.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {shots.map((s) => (
            <figure
              key={s.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-surface"
            >
              <Image
                src={s.photo}
                alt={s.alt ?? `${s.caption} ${s.village}`}
                fill
                sizes="(min-width: 1024px) 270px, 50vw"
                quality={70}
                placeholder="blur"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                style={{ objectPosition: s.focus ?? 'center' }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3.5 text-white md:p-5">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] opacity-85 md:text-[11px]">
                  <MapPin className="h-3 w-3 flex-none" strokeWidth={2} />
                  {s.caption}
                </div>
                <div className="mt-1 font-display text-[17px] font-semibold leading-tight tracking-tight md:text-[22px]">
                  {s.village}
                </div>
              </figcaption>
              {s.showroom && (
                <a
                  href={brand.appointmentUrl}
                  target="_blank"
                  rel="noopener"
                  className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-medium text-ink shadow-card transition-colors hover:bg-white md:left-4 md:top-4"
                >
                  <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Plan een bezoek
                </a>
              )}
            </figure>
          ))}
        </div>

        <GreenRide />

      </div>
    </section>
  );
}

/**
 * Klein accent: de adviba-bus rijdt tijdens het scrollen over een dijkweg.
 * Geen vastgezette sectie; bij reduced motion staat hij stil.
 */
function GreenRide() {
  const road = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const reduce = useReducedMotion();
  const vanW = trackW < 480 ? 120 : 160;

  useEffect(() => {
    const el = road.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setTrackW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: road, offset: ['start end', 'end 40%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  // rechts naar links; de bus kijkt naar links
  const x = useTransform(smooth, (p) => (1 - p) * Math.max(0, trackW - vanW));

  return (
    <div className="mt-10 flex flex-col gap-3 md:mt-12 md:flex-row md:items-end md:gap-10">
      <div className="flex-none md:w-[240px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3d862c]">
          <Leaf className="h-3.5 w-3.5" strokeWidth={2} />
          adviba rijdt groen
        </div>
        <p className="mt-2 font-display text-[19px] font-semibold leading-snug tracking-tight text-ink">
          We houden Maas en Waal graag{' '}
          <span className="font-slab italic font-normal text-[#3d862c]">groen.</span>
        </p>
      </div>

      <div ref={road} className="relative h-[96px] flex-none md:h-[110px] md:flex-1" aria-hidden>
        <div className="absolute inset-x-0 bottom-[10px] h-3 rounded-full bg-[#dcd5c3]">
          <div className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 border-t-2 border-dashed border-white/90" />
        </div>
        <div className="absolute inset-x-0 bottom-[7px] h-3 rounded-full bg-brand-green/15" />

        {trackW > 0 && (
          <motion.div
            className="absolute bottom-[17px] left-0 will-change-transform"
            style={{ x: reduce ? Math.max(0, trackW - vanW) / 2 : x, width: vanW }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -1.2, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={bus}
                alt=""
                sizes="160px"
                className="h-auto w-full drop-shadow-[0_6px_6px_rgba(51,54,59,0.25)]"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
