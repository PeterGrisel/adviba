'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/calculatePrice';

interface Props {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}

export function ProductCard({ product, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        'group relative flex w-full flex-col overflow-hidden rounded-card border bg-surface text-left transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        selected
          ? 'border-accent shadow-elevated ring-1 ring-accent'
          : 'border-line hover:border-ink/40 hover:shadow-card',
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas md:aspect-[16/10]">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 220px, (min-width: 768px) 30vw, 50vw"
          quality={70}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <motion.div
          initial={false}
          animate={{
            opacity: selected ? 1 : 0,
            scale: selected ? 1 : 0.7,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-accent text-on-accent shadow-elevated"
        >
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5 md:p-5">
        <h3 className="break-words text-[16px] font-semibold leading-tight tracking-tight text-ink md:text-lg">{product.name.replace('overkapping', '\u00ADoverkapping')}</h3>
        <p className="hidden text-[14px] leading-snug text-ink-muted sm:line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-2 md:pt-3">
          <span className="text-[11px] uppercase tracking-[0.12em] text-ink-muted md:text-[12px]">Vanaf</span>
          <div className="text-[16px] font-semibold tracking-tight text-ink md:text-lg">
            {formatCurrency(product.basePrice)}
          </div>
        </div>
      </div>
    </button>
  );
}
