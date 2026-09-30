'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { BrandMark, type BrandVariant } from './BrandMark';
import type { ProjectPhoto } from '@/data/projects';

const filters: { id: 'alle' | BrandVariant; label: string }[] = [
  { id: 'alle', label: 'Alle' },
  { id: 'zonwering', label: 'Zonwering' },
  { id: 'rolluiken', label: 'Rolluiken' },
  { id: 'horren', label: 'Horren' },
];

/**
 * Soepele projectenslider (Embla): vrij slepen met momentum, langzaam
 * doorlopend (pauzeert bij hover, slepen en focus), filter per merk en een
 * lightbox. Schaalt naar veel foto's: alleen zichtbare beelden laden.
 */
export function ProjectSlider({ projects }: { projects: ProjectPhoto[] }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('alle');
  const [open, setOpen] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const visible = useMemo(
    () => (filter === 'alle' ? projects : projects.filter((p) => p.label === filter)),
    [projects, filter]
  );
  const counts = useMemo(() => {
    const c: Record<string, number> = { alle: projects.length };
    projects.forEach((p) => (c[p.label] = (c[p.label] ?? 0) + 1));
    return c;
  }, [projects]);

  const plugins = useMemo(
    () =>
      reduce
        ? []
        : [
            AutoScroll({
              speed: 0.6,
              startDelay: 800,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
            }),
          ],
    [reduce]
  );
  const [viewportRef, embla] = useEmblaCarousel(
    { loop: visible.length > 3, dragFree: true, align: 'start', containScroll: false },
    plugins
  );

  useEffect(() => {
    if (!embla) return;
    const onScroll = () => setProgress(Math.max(0, Math.min(1, embla.scrollProgress())));
    embla.on('scroll', onScroll).on('reInit', onScroll);
    onScroll();
    return () => {
      embla.off('scroll', onScroll).off('reInit', onScroll);
    };
  }, [embla]);

  // Nieuw filter: terug naar het begin
  useEffect(() => {
    embla?.reInit();
    embla?.scrollTo(0, true);
  }, [embla, filter]);

  const scrollBy = useCallback(
    (dir: 1 | -1) => {
      if (!embla) return;
      embla.plugins().autoScroll?.stop();
      if (dir === 1) embla.scrollNext();
      else embla.scrollPrev();
    },
    [embla]
  );

  const openAt = (i: number) => {
    // Embla onderdrukt zelf de klik na een sleepbeweging
    embla?.plugins().autoScroll?.stop();
    setOpen(i);
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 md:mb-6">
        <div role="tablist" aria-label="Filter projecten" className="flex flex-wrap gap-2">
          {filters.map((f) =>
            (counts[f.id] ?? 0) === 0 ? null : (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={[
                  'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors',
                  filter === f.id
                    ? 'border-ink bg-ink text-surface'
                    : 'border-line bg-surface text-ink hover:border-ink/40',
                ].join(' ')}
              >
                {f.id !== 'alle' && (
                  <BrandMark variant={f.id} onDark={filter === f.id} className="h-4 w-5 flex-none" />
                )}
                {f.label}
                <span className="text-[11px] opacity-60">{counts[f.id]}</span>
              </button>
            )
          )}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Vorige projecten"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Volgende projecten"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Viewport loopt van schermrand tot schermrand voor een doorlopend gevoel */}
      <div
        ref={viewportRef}
        className="relative left-1/2 w-screen -translate-x-1/2 cursor-grab overflow-hidden active:cursor-grabbing"
        aria-roledescription="carousel"
        aria-label="Projecten van adviba"
      >
        <ul className="flex touch-pan-y">
          {visible.map((p, i) => (
            <li
              key={p.src}
              className="min-w-0 flex-[0_0_74%] pl-3 sm:flex-[0_0_42%] md:flex-[0_0_30%] md:pl-5 lg:flex-[0_0_22%] 2xl:flex-[0_0_17%]"
            >
              <button
                type="button"
                onClick={() => openAt(i)}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-card border border-line bg-canvas text-left"
                aria-label={`Bekijk groot: ${p.title}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 31vw, (min-width: 640px) 44vw, 72vw"
                  quality={70}
                  draggable={false}
                  className="select-none object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/35 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3.5 pb-3.5 pt-12 text-white">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] opacity-90">
                    <BrandMark variant={p.label} onDark className="h-5 w-6 flex-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    {p.product}
                    {p.place && <span className="font-normal normal-case tracking-normal">· {p.place}</span>}
                  </span>
                  <span className="mt-1 block text-[15px] font-medium leading-snug md:text-[16px]">
                    {p.title}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Voortgangsbalk */}
      <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-line" aria-hidden>
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(8, progress * 100)}%` }}
        />
      </div>

      <Lightbox
        items={visible}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={(i) => setOpen(i)}
      />
    </div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: ProjectPhoto[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [index, go, onClose]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-dark-deep"
          onClick={onClose}
          data-lenis-prevent
        >
          <div className="flex items-center justify-between px-4 py-3 text-white md:px-6">
            <div className="text-[14px]">
              <span className="opacity-60">
                {index! + 1} / {items.length}
              </span>
              <span className="ml-3 font-medium">{item.title}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={item.src}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 mx-4 mb-4 md:mx-20"
              >
                <Image src={item.src} alt={item.alt} fill sizes="100vw" quality={80} className="object-contain" />
              </motion.div>
            </AnimatePresence>
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Vorige foto"
                  className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-5"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Volgende foto"
                  className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-5"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
