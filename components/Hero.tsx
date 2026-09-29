'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, MapPin, Pause, PhoneCall, Play } from 'lucide-react';
import { brand } from '@/data/configurator';
import Image from 'next/image';
import { BrandMark, type BrandVariant } from './BrandMark';
import { imageSrc } from '@/lib/remoteImages';
import { AdvibaLogo } from './AdvibaLogo';
import { brandToProduct, useBrandTheme } from './BrandTheme';

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
}


const slides: Slide[] = [
  {
    id: 'zonwering',
    label: 'Zonwering',
    subLabel: 'Comfort voor elk seizoen',
    headlinePrefix: 'Van zon naar',
    headlineAccent: 'comfort.',
    body: 'Screens, uitvalschermen en markiezen, geleverd en gemonteerd door adviba: jouw specialist tussen Heerewaarden en Ewijk.',
    image: imageSrc('waal-beneden-leeuwen'),
    colorClass: 'text-accent-bright',
    bgClass: 'bg-accent-bright',
  },
  {
    id: 'rolluiken',
    label: 'Rolluiken',
    subLabel: 'Veilig, koel en rustig',
    headlinePrefix: 'Meer dan alleen',
    headlineAccent: 'privacy.',
    body: 'Rolluiken die je woning verduisteren, isoleren en beschermen. Op maat gemaakt door adviba, lokaal geïnstalleerd in Maas en Waal.',
    image: imageSrc('waaldijk-dreumel'),
    colorClass: 'text-brand-orange',
    bgClass: 'bg-brand-orange',
  },
  {
    id: 'horren',
    label: 'Horren',
    subLabel: 'Frisse lucht, zonder ongedierte',
    headlinePrefix: 'Frisse lucht zonder',
    headlineAccent: 'ongedierte.',
    body: 'Horren die passen bij elk raam of deur. Muggen buiten, daglicht binnen. adviba plaatst ze bij je thuis in de streek.',
    image: imageSrc('dreumelsche-waard'),
    colorClass: 'text-brand-green',
    bgClass: 'bg-brand-green',
  },
];

// Lang genoeg om kop + body rustig te lezen (WCAG 2.2.2: pauzeerbaar)
const AUTO_ADVANCE_MS = 9000;

export function Hero() {
  const { brand: activeBrand, setBrand, interacted, markInteracted, requestProduct } =
    useBrandTheme();
  const index = Math.max(0, slides.findIndex((s) => s.id === activeBrand));
  const setIndex = (i: number) => setBrand(slides[i].id);
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  // Niet doorwisselen als de hero uit beeld is of de bezoeker zelf koos —
  // anders verspringen de merkkleuren in de configurator tijdens het invullen.
  const paused = hovered || focused || userPaused || !inView || interacted;
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const slide = slides[index];

  const advance = useCallback(
    (dir: 1 | -1 = 1) => {
      setBrand((b) => {
        const i = slides.findIndex((s) => s.id === b);
        return slides[(i + dir + slides.length) % slides.length].id;
      });
    },
    [setBrand]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio > 0.5), {
      threshold: [0, 0.5, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    timer.current = setInterval(() => advance(1), AUTO_ADVANCE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [advance, reduce, paused]);


  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[calc(100svh-76px)] flex-col justify-center overflow-hidden bg-dark text-dark-fg"
      aria-label="Introductie Maas en Waal: zonwering, rolluiken en horren"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
    >
      {/* Achtergrond — kruisvervaging tussen slides */}
      <div className="absolute inset-0 -z-10">
        {/* Alle slides blijven gemount; alleen opacity wisselt (GPU), dus geen
         * her-decoderen of layout-werk bij elke wissel. */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-[1100ms] ease-out will-change-[opacity]"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <Image
              src={s.image}
              alt=""
              fill
              sizes="100vw"
              quality={70}
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}

        {/* Vaste dark overlays — leesbaarheid over WELKE achtergrond dan ook.
         * Mobiel: tekst loopt over de volle breedte, dus een egale scrim.
         * Desktop: tekstkolom links vrijwel dicht, foto rechts zichtbaar. */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/45 via-dark/55 to-dark/80 md:bg-transparent md:bg-gradient-to-r md:from-dark/85 md:via-dark/45 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark/80 to-transparent" />

      </div>

      {/* Top-right: onderdeel van adviba */}
      <div className="pointer-events-none absolute right-5 top-5 hidden md:block md:right-8">
        <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-dark-deep/75 px-3 py-1.5">
          <span className="text-[11px] uppercase tracking-[0.16em] text-dark-fg/75">
            Onderdeel van
          </span>
          <AdvibaLogo className="h-5" />
          <span className="hidden text-[11px] uppercase tracking-[0.16em] text-dark-fg/75 lg:inline">
            · Lokaal vakmanschap
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-12">
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
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-dark-deep/75 px-3 py-1.5">
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

            <p className="mt-5 font-display text-[clamp(34px,min(6.2vw,8.2svh),76px)] font-semibold leading-[1.04] tracking-tight text-white [text-shadow:0_2px_24px_rgb(0_0_0/0.55)]">
              {slide.headlinePrefix}{' '}
              <span className={[slide.colorClass, 'font-bold'].join(' ')}>
                {slide.headlineAccent}
              </span>
            </p>

            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/90 [text-shadow:0_1px_2px_rgb(0_0_0/0.6),0_1px_16px_rgb(0_0_0/0.55)] md:text-[18px]">
              {slide.body}
            </p>

            {/* Vaste H1 (de grote kop hierboven wisselt per slide) */}
            <h1 className="mt-4 inline-flex items-center gap-2 font-slab text-[14px] font-normal italic text-white/85 [text-shadow:0_1px_8px_rgb(0_0_0/0.6)]">
              <MapPin className="h-4 w-4 flex-none text-white" strokeWidth={1.75} />
              Zonwering, rolluiken &amp; horren in Maas en Waal
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#configureer"
                onClick={() => {
                  markInteracted();
                  requestProduct(brandToProduct[slide.id]);
                }}
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
                href={brand.helpPhoneHref}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-dark-deep/70 px-5 text-[15px] font-medium text-dark-fg transition-colors hover:border-white"
              >
                <PhoneCall className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span className="sm:hidden">Bel</span>
                <span className="hidden sm:inline">of bel adviba</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Brand-tabs — 3 merken kiezen */}
        <div className="mt-8 md:mt-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.16em] text-dark-fg/80">
              Drie merken · één specialist
            </span>
            {!reduce && !interacted && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={userPaused ? 'Diavoorstelling afspelen' : 'Diavoorstelling pauzeren'}
                className="grid h-7 w-7 place-items-center rounded-full border border-white/25 bg-dark-deep/70 text-dark-fg transition-colors hover:border-white"
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
            className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap"
          >
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    markInteracted();
                    setIndex(i);
                  }}
                  className={[
                    'group relative inline-flex items-center justify-center gap-2 rounded-full border px-2.5 py-2 text-left transition-all sm:justify-start sm:gap-2.5 sm:px-3.5',
                    active
                      ? 'border-white bg-white text-dark shadow-elevated'
                      : 'border-white/20 bg-dark-deep/75 text-dark-fg/90 hover:border-white/60 hover:text-dark-fg',
                  ].join(' ')}
                >
                  <BrandMark
                    className="hidden h-6 w-7 sm:block"
                    variant={s.id}
                    onDark={!active}
                  />
                  <span className="flex flex-col leading-tight">
                    <span
                      className={[
                        'font-display text-[12px] font-semibold uppercase tracking-[0.1em] sm:text-[13px] sm:tracking-[0.14em]',
                        // op wit -> donker (leesbaar); op dark -> muted grey
                        active ? 'text-dark' : '',
                      ].join(' ')}
                    >
                      {s.label}
                    </span>
                    <span
                      className={[
                        'hidden text-[11px] uppercase tracking-[0.1em] sm:block',
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
