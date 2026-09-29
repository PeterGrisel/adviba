'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, MapPin, Pause, PhoneCall, Play } from 'lucide-react';
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

// Lang genoeg om kop + body rustig te lezen (WCAG 2.2.2: pauzeerbaar)
const AUTO_ADVANCE_MS = 9000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const paused = hovered || focused || userPaused;
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
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

        {/* Vaste dark overlays — leesbaarheid over WELKE achtergrond dan ook.
         * Mobiel: tekst loopt over de volle breedte, dus een egale scrim.
         * Desktop: tekstkolom links vrijwel dicht, foto rechts zichtbaar. */}
        <div className="absolute inset-0 bg-dark/80 md:bg-transparent md:bg-gradient-to-r md:from-dark/95 md:via-dark/80 md:to-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-dark/40" />

        {/* Brand-gekleurde gloed onder-rechts, wisselt mee */}
        <motion.div
          key={`glow-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute -bottom-40 -right-24 hidden h-[28rem] md:block w-[28rem] rounded-full blur-3xl"
          style={{ background: `rgb(${slide.glowColor})` }}
        />
      </div>

      {/* Top-right: onderdeel van ADviba */}
      <div className="pointer-events-none absolute right-5 top-5 hidden md:block md:right-8">
        <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-dark-deep/75 px-3 py-1.5 backdrop-blur">
          <span className="text-[11px] uppercase tracking-[0.16em] text-dark-fg/75">
            Onderdeel van
          </span>
          <span className="font-display text-[13px] font-semibold tracking-tight text-dark-fg">
            adviba
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.16em] text-dark-fg/75 lg:inline">
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
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-dark-deep/75 px-3 py-1.5 backdrop-blur">
              <BrandMark className="h-5 w-6" variant={slide.id} onDark />
              <span
                className={[
                  'font-display text-[12px] font-semibold uppercase tracking-[0.16em]',
                  slide.colorClass,
                ].join(' ')}
              >
                {slide.label}
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.14em] text-dark-fg/80 sm:inline">
                {slide.subLabel}
              </span>
            </div>

            <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.45)] md:text-[64px] lg:text-[74px]">
              {slide.headlinePrefix}{' '}
              <span className={[slide.colorClass, 'font-bold'].join(' ')}>
                {slide.headlineAccent}
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-dark-fg/90 [text-shadow:0_1px_12px_rgb(0_0_0/0.5)] md:text-[19px]">
              {slide.body}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 font-slab text-[14px] italic text-dark-fg/85">
              <MapPin className="h-4 w-4 text-white" strokeWidth={1.75} />
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
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-dark-deep/70 px-5 text-[15px] font-medium text-dark-fg backdrop-blur transition-colors hover:border-white"
              >
                <PhoneCall className="h-3.5 w-3.5" strokeWidth={1.75} />
                of bel ADviba
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Brand-tabs — 3 merken kiezen */}
        <div className="mt-12 md:mt-16">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.16em] text-dark-fg/80">
              Drie merken · één specialist
            </span>
            {!reduce && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Diavoorstelling afspelen' : 'Diavoorstelling pauzeren'}
                className="grid h-7 w-7 place-items-center rounded-full border border-white/25 bg-dark-deep/70 text-dark-fg backdrop-blur transition-colors hover:border-white"
              >
                {userPaused ? (
                  <Play className="h-3 w-3" strokeWidth={2.25} />
                ) : (
                  <Pause className="h-3 w-3" strokeWidth={2.25} />
                )}
              </button>
            )}
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
                      : 'border-white/20 bg-dark-deep/75 text-dark-fg/90 backdrop-blur hover:border-white/60 hover:text-dark-fg',
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
                        'text-[11px] uppercase tracking-[0.1em]',
                        active ? 'text-ink' : 'text-dark-fg/75',
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
