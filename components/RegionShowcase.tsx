'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { CalendarDays, Leaf, MapPin } from 'lucide-react';
import { brand } from '@/data/configurator';
import { imageSrc, type ImageKey } from '@/lib/remoteImages';
import bus from '@/public/media/adviba-bus.webp';

interface Stop {
  id: string;
  /** positie op de weg: 0 = links (west), 1 = rechts (oost) */
  at: number;
  label: string;
  caption: string;
  village: string;
  image?: ImageKey;
  credit?: string;
  showroom?: boolean;
}

/**
 * Route van oost naar west, zoals de bus rijdt: vanuit de showroom in
 * Boven-Leeuwen langs de Waal richting Heerewaarden. Foto's: Wikimedia
 * Commons (vrije licenties).
 */
const stops: Stop[] = [
  {
    id: 'showroom',
    at: 0.9,
    label: 'Showroom',
    caption: 'Hier begint het, in',
    village: 'Boven-Leeuwen',
    showroom: true,
  },
  {
    id: 'beneden-leeuwen',
    at: 0.7,
    label: 'Beneden-Leeuwen',
    caption: 'De Waal, aan de rand van',
    village: 'Beneden-Leeuwen',
    image: 'waal-beneden-leeuwen',
    credit: 'Foto: bertknot via Panoramio, CC BY-SA 3.0',
  },
  {
    id: 'waalbandijk',
    at: 0.5,
    label: 'Waalbandijk',
    caption: 'Waalbandijk richting',
    village: 'Dreumel',
    image: 'waalbandijk-dreumel',
    credit: 'Foto: Wutsje via Wikimedia Commons, CC BY-SA 3.0',
  },
  {
    id: 'dreumel',
    at: 0.3,
    label: 'Dreumel',
    caption: 'Dorpstoren van',
    village: 'Dreumel',
    image: 'dreumel-kerk',
    credit: 'Foto: Wikimedia Commons, CC BY-SA 4.0',
  },
  {
    id: 'dreumelsche-waard',
    at: 0.1,
    label: 'Dreumelsche Waard',
    caption: 'Uiterwaarden bij',
    village: 'Dreumelsche Waard',
    image: 'dreumelsche-waard',
    credit: 'Foto: Wikimedia Commons',
  },
];

const photoStops = stops.filter((s) => s.image);

export function RegionShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-line bg-canvas">
      <div className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
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
            Stap in: vanuit onze showroom rijden we langs de Waal door de streek die we van binnen
            kennen.
          </p>
        </div>
      </div>

      {reduce ? <StaticRoute /> : <Journey />}

      <div className="mx-auto max-w-6xl px-5 pb-14 md:px-8 md:pb-20">
        <p className="text-[11px] leading-relaxed text-ink-muted">
          Beeld: Wikimedia Commons.{' '}
          {photoStops.map((s, i) => (
            <span key={s.id}>
              {i > 0 && ' · '}
              {s.village}: {s.credit}
            </span>
          ))}
          .
        </p>
      </div>
    </section>
  );
}

/** Scroll-verhaal: sectie blijft staan, bus rijdt, foto wisselt per plek. */
function Journey() {
  const outer = useRef<HTMLDivElement>(null);
  const road = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);
  const [active, setActive] = useState(0);
  const vanW = trackW < 480 ? 130 : 190;

  useEffect(() => {
    const el = road.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setTrackW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35 });

  // Van net rechts van de showroom tot voorbij de laatste stop
  const startF = 0.97;
  const endF = 0.03;
  const centerF = useTransform(smooth, (p) => startF + (endF - startF) * p);
  const x = useTransform(centerF, (f) =>
    Math.min(Math.max(0, f * trackW - vanW / 2), Math.max(0, trackW - vanW))
  );

  useMotionValueEvent(centerF, 'change', (f) => {
    // Actieve stop = de laatst gepasseerde (bus is er voorbij of eroverheen)
    let idx = 0;
    stops.forEach((s, i) => {
      if (f <= s.at + 0.06) idx = i;
    });
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const stop = stops[active];

  return (
    <div ref={outer} className="relative h-[320vh]" data-hide-floater>
      <div className="sticky top-[76px] flex h-[calc(100svh-76px)] flex-col justify-center">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          {/* Fotopodium */}
          <div className="relative mx-auto aspect-[4/5] max-h-[58svh] w-full overflow-hidden rounded-card border border-line bg-surface shadow-card sm:aspect-[16/9] md:max-h-[56svh]">
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {stop.image ? (
                  <>
                    <Image
                      src={imageSrc(stop.image)}
                      alt={`${stop.caption} ${stop.village}`}
                      fill
                      sizes="(min-width: 1152px) 1088px, 100vw"
                      quality={70}
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  </>
                ) : (
                  <ShowroomCard />
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <div
                    className={[
                      'flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] md:text-[12px]',
                      stop.image ? 'text-white/85' : 'text-ink-muted',
                    ].join(' ')}
                  >
                    <MapPin className="h-3 w-3" strokeWidth={2} />
                    {stop.caption}
                  </div>
                  <div
                    className={[
                      'mt-1 font-display text-[24px] font-semibold leading-tight tracking-tight md:text-[32px]',
                      stop.image ? 'text-white' : 'text-ink',
                    ].join(' ')}
                  >
                    {stop.village}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Voortgang: stip per stop */}
            <div className="absolute right-4 top-4 flex gap-1.5 md:right-5 md:top-5" aria-hidden>
              {stops.map((s, i) => (
                <span
                  key={s.id}
                  className={[
                    'h-1.5 rounded-full transition-all duration-500',
                    i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/50',
                    !stops[active].image && (i === active ? '!bg-accent' : '!bg-ink/20'),
                  ].join(' ')}
                />
              ))}
            </div>
          </div>

          {/* Weg met bus */}
          <div className="mt-4 flex items-end gap-4 md:mt-6 md:gap-8">
            <div className="hidden w-[220px] flex-none md:block">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#3d862c]">
                <Leaf className="h-3.5 w-3.5" strokeWidth={2} />
                adviba rijdt groen
              </div>
              <p className="mt-2 font-display text-[19px] font-semibold leading-snug tracking-tight text-ink">
                We houden Maas en Waal graag{' '}
                <span className="font-slab italic font-normal text-[#3d862c]">groen.</span>
              </p>
            </div>

            <div ref={road} className="relative h-[118px] flex-1 md:h-[150px]" aria-hidden>
              <div className="absolute inset-x-0 bottom-[30px] h-3 rounded-full bg-[#dcd5c3]">
                <div className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 border-t-2 border-dashed border-white/90" />
              </div>
              <div className="absolute inset-x-0 bottom-[27px] h-3 rounded-full bg-brand-green/15" />

              {stops.map((s, i) => (
                <div
                  key={s.id}
                  className="absolute bottom-0 flex -translate-x-1/2 flex-col-reverse items-center"
                  style={{ left: `${s.at * 100}%` }}
                >
                  <span
                    className={[
                      'whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 md:text-[10.5px]',
                      i === active ? (s.showroom ? 'text-accent' : 'text-ink') : 'text-ink-muted/70',
                      i === active ? '' : 'hidden sm:block',
                    ].join(' ')}
                  >
                    {s.label}
                  </span>
                  <span
                    className={[
                      'mb-1.5 rounded-full ring-2 ring-canvas transition-all duration-300',
                      i === active ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5',
                      s.showroom ? 'bg-accent' : i === active ? 'bg-[#3d862c]' : 'bg-brand-green/60',
                    ].join(' ')}
                  />
                </div>
              ))}

              {trackW > 0 && (
                <motion.div
                  className="absolute bottom-[37px] left-0 will-change-transform"
                  style={{ x, width: vanW }}
                >
                  <motion.div
                    animate={{ y: [0, -1.2, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Image
                      src={bus}
                      alt=""
                      sizes="190px"
                      className="h-auto w-full drop-shadow-[0_6px_6px_rgba(51,54,59,0.25)]"
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowroomCard() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-surface via-canvas to-accent-soft/40">
      <div className="px-6 pb-20 text-center md:pb-16">
        <Image src={bus} alt="De bus van adviba" sizes="360px" className="mx-auto h-auto w-[62%] max-w-[360px]" />
        <p className="mt-3 text-[13px] text-ink-muted md:text-[14px]">
          {brand.address}, {brand.postalCity} · {brand.showroom.toLowerCase()}
        </p>
        <a
          href={brand.appointmentUrl}
          target="_blank"
          rel="noopener"
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:border-ink/40"
        >
          <CalendarDays className="h-4 w-4" strokeWidth={1.75} />
          Plan een showroombezoek
        </a>
      </div>
    </div>
  );
}

/** Zonder beweging: gewone fotogrid. */
function StaticRoute() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {photoStops.map((s) => (
          <figure key={s.id} className="relative aspect-[4/5] overflow-hidden rounded-card border border-line">
            <Image
              src={imageSrc(s.image!)}
              alt={`${s.caption} ${s.village}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              quality={70}
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="text-[11px] uppercase tracking-[0.14em] opacity-80">{s.caption}</div>
              <div className="font-display text-[20px] font-semibold">{s.village}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
