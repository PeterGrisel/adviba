'use client';

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
          ? 'border-ink shadow-elevated'
          : 'border-line hover:border-ink/40 hover:shadow-card',
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <motion.div
          initial={false}
          animate={{
            opacity: selected ? 1 : 0,
            scale: selected ? 1 : 0.7,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-ink text-surface shadow-elevated"
        >
          <Check className="h-4 w-4" strokeWidth={2.5} />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-xl font-semibold tracking-tight text-ink">{product.name}</h3>
        <p className="text-[15px] leading-relaxed text-ink-muted">{product.description}</p>
        <div className="mt-auto pt-4">
          <span className="text-[13px] uppercase tracking-[0.12em] text-ink-muted">Vanaf</span>
          <div className="text-lg font-semibold tracking-tight text-ink">
            {formatCurrency(product.basePrice)}
          </div>
        </div>
      </div>
    </button>
  );
}
