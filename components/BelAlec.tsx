'use client';

import { useReducedMotion } from 'framer-motion';
import { PhoneCall } from 'lucide-react';
import { brand } from '@/data/configurator';

/** Rond videootje van Alec die zwaait (stilstaand bij reduced motion). */
export function AlecAvatar({ className = 'h-9 w-9' }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`relative block flex-none overflow-hidden rounded-full ring-2 ring-white/80 ${className}`}>
      {reduce ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/media/alec-poster.jpg" alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          className="h-full w-full object-cover"
          poster="/media/alec-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/media/alec-zwaait.webm" type="video/webm" />
          <source src="/media/alec-zwaait.mp4" type="video/mp4" />
        </video>
      )}
    </span>
  );
}

/** Compacte belknop met zwaaiende Alec. */
export function BelAlecButton({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const styles =
    variant === 'dark'
      ? 'border-white/30 bg-dark-deep/70 text-dark-fg hover:border-white'
      : 'border-line bg-surface text-ink hover:border-ink/40 hover:shadow-card';
  return (
    <a
      href={brand.helpPhoneHref}
      aria-label={`Bel Alec van adviba: ${brand.helpPhone}`}
      className={`group inline-flex h-12 items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 transition-all ${styles}`}
    >
      <AlecAvatar className="h-9 w-9" />
      <span className="flex flex-col leading-tight">
        <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold">
          <PhoneCall className="h-3.5 w-3.5" strokeWidth={2} />
          Bel Alec
        </span>
        <span className="hidden text-[11px] opacity-70 sm:block">{brand.helpPhone}</span>
      </span>
    </a>
  );
}
