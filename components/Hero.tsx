'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, MapPin, PhoneCall } from 'lucide-react';
import { brand } from '@/data/configurator';
import { BrandMark, type BrandVariant } from './BrandMark';

interface Slide {
  id: BrandVariant;
  label: string;
  subLabel: string;
  headlinePrefix: string;
  headlineAccent: string; // laatste woord in de brand-kleur
  body: string;
  image: string;
  colorClass: string; // tekst + border kleur
  bgClass: string; // solid fill van de brand-kleur (voor CTAs, badge)
  glowColor: string; // rgb voor achtergrondgloed
}

const wm = (file: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    file
  )}?width=2400`;

const slides: Slide[] = [
  {
    id: 'zonwering',
    label: 'Zonwering',
    subLabel: 'Comfort voor elk seizoen',
    headlinePrefix: 'Van zon naar',
    headlineAccent: 'comfort.',
    body: 'Screens, uitvalschermen en markiezen — geleverd en gemonteerd door ADviba, jouw specialist tussen Heerewaarden en Ewijk.',
    image: wm('De_Waal_bij_Beneden_Leeuwen_-_panoramio.jpg'),
    colorClass: 'text-accent-bright',
    bgClass: 'bg-accent-bright',
    glowColor: '245, 166, 35',
  },
  {
    id: 'rolluiken',
    label: 'Rolluiken',
    subLabel: 'Veilig, koel en rustig',
    headlinePrefix: 'Meer dan alleen',
    headlineAccent: 'privacy.',
    body: 'Rolluiken die je woning verduisteren, isoleren en beschermen. Op maat gemaakt door ADviba, lokaal geïnstalleerd in Maas en Waal.',
    image: wm('Van_af_de_Waaldijk_zien_we_het_dorp_Dreumel.jpg'),
    colorClass: 'text-brand-orange',
    bgClass: 'bg-brand-orange',
    glowColor: '232, 97, 31',
  },
  {
    id: 'horren',
    label: 'Horren',
    subLabel: 'Frisse lucht, zonder ongedierte',
    headlinePrefix: 'Frisse lucht zonder',
    headlineAccent: 'ongedierte.',
    body: 'Horren die passen bij elk raam of deur — muggen buiten, daglicht binnen. ADviba plaatst ze bij je thuis in de streek.',
    image: wm('Dreumelsche_Waard.jpg'),
    colorClass: 'text-brand-green',
    bgClass: 'bg-brand-green',
    glowColor: '90, 168, 71',
  },
];

const AUTO_ADVANCE_MS = 6500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const slide = slides[index];

  const advance = useCallback(
    (dir: 1 | -1 = 1) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    []
  );

  useEffect(() => {
    if (reduce || paused) return;
    timer.current = setInterval(() => advance(1), AUTO_ADVANCE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [advance, reduce, paused]);

  // Preload andere slides zodat de wissel snel voelt
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-dark text-dark-fg"
      aria-label="Introductie Maas en Waal — Zonwering, Rolluiken, Horren"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Achtergrond — kruisvervaging tussen slides */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Vaste dark overlays — leesbaarheid over WELKE achtergrond dan ook */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/75 to-dark/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/20" />

        {/* Brand-gekleurde gloed onder-rechts, wisselt mee */}
        <motion.div
          key={`glow-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.28 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: `rgb(${slide.glowColor})` }}
        />
      </div>

      {/* Top-right: onderdeel van ADviba */}
      <div className="pointer-events-none absolute right-5 top-5 hidden md:block md:right-8">
        <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-dark-line bg-dark-deep/70 px-3 py-1.5 backdrop-blur">
          <span className="text-[10.5px] uppercase tracking-[0.18em] text-dark-fg-muted">
            Onderdeel van
          </span>
          <span className="font-display text-[13px] font-semibold tracking-tight text-dark-fg">
            adviba
          </span>
          <span className="hidden text-[10.5px] uppercase tracking-[0.18em] text-dark-fg-muted lg:inline">
            · Lokaal vakmanschap
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24 lg:py-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {/* Brand-eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-dark-line bg-dark-deep/70 px-3 py-1.5 backdrop-blur">
              <BrandMark className="h-5 w-6" variant={slide.id} onDark />
              <span
                className={[
                  'font-display text-[12px] font-semibold uppercase tracking-[0.16em]',
                  slide.colorClass,
                ].join(' ')}
              >
                {slide.label}
              </span>
              <span className="text-[10.5px] uppercase tracking-[0.14em] text-dark-fg-muted">
                {slide.subLabel}
              </span>
            </div>

            <h1 className="mt-6 font-display text-[42px] font-semibold leading-[1.03] tracking-tight text-white md:text-[64px] lg:text-[74px]">
              {slide.headlinePrefix}{' '}
              <span className={[slide.colorClass, 'font-bold'].join(' ')}>
                {slide.headlineAccent}
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-dark-fg-muted md:text-[18px]">
              {slide.body}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-[13px] italic text-dark-fg-muted font-slab">
              <MapPin className="h-3.5 w-3.5 text-white" strokeWidth={1.75} />
              Lokaal geregeld in Maas en Waal
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#configureer"
                className={[
                  'group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-dark transition-all hover:bg-white hover:shadow-warm',
                  slide.bgClass,
                ].join(' ')}
              >
                Configureer online
                <ArrowDown
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  strokeWidth={2.25}
                />
              </a>
              <a
                href={`tel:${brand.helpPhone.replace(/\s|\(|\)/g, '')}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-dark-line bg-dark-deep/60 px-5 text-[14px] font-medium text-dark-fg backdrop-blur transition-colors hover:border-white"
              >
                <PhoneCall className="h-3.5 w-3.5" strokeWidth={1.75} />
                of bel ADviba
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Brand-tabs — 3 merken kiezen */}
        <div className="mt-12 md:mt-16">
          <div className="mb-3 text-[10.5px] uppercase tracking-[0.18em] text-dark-fg-muted">
            Drie merken · één specialist
          </div>
          <div
            role="tablist"
            aria-label="Kies een merk"
            className="flex flex-wrap gap-2"
          >
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setIndex(i)}
                  className={[
                    'group relative inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-left transition-all',
                    active
                      ? 'border-white bg-white text-dark shadow-elevated'
                      : 'border-dark-line bg-dark-deep/60 text-dark-fg-muted backdrop-blur hover:border-white/50 hover:text-dark-fg',
                  ].join(' ')}
                >
                  <BrandMark
                    className="h-6 w-7"
                    variant={s.id}
                    onDark={!active}
                  />
                  <span className="flex flex-col leading-tight">
                    <span
                      className={[
                        'font-display text-[13px] font-semibold uppercase tracking-[0.14em]',
                        // op wit -> donker (leesbaar); op dark -> muted grey
                        active ? 'text-dark' : '',
                      ].join(' ')}
                    >
                      {s.label}
                    </span>
                    <span
                      className={[
                        'text-[10px] uppercase tracking-[0.12em]',
                        active ? 'text-ink-muted' : 'opacity-80',
                      ].join(' ')}
                    >
                      {s.subLabel}
                    </span>
                  </span>
                  {/* Auto-advance progress-lijn onder de actieve tab */}
                  {active && !reduce && !paused && (
                    <motion.span
                      key={`bar-${s.id}-${index}`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                      className={[
                        'absolute bottom-0 left-3 right-3 h-[2px] rounded-full',
                        s.bgClass,
                      ].join(' ')}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
