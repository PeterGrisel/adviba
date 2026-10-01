'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/calculatePrice';
import { BrandMark, type BrandVariant } from './BrandMark';
import { productToBrand } from './BrandTheme';

const tint: Record<BrandVariant, string> = {
  zonwering: 'bg-[#f5a623]/10',
  rolluiken: 'bg-[#f5a623]/10',
  horren: 'bg-[#f5a623]/10',
};

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
      {/* Merkteken i.p.v. foto: projectfoto's staan in de projectenslider */}
      <div
        className={[
          'relative grid h-24 w-full place-items-center overflow-hidden md:h-28',
          tint[productToBrand[product.id]],
        ].join(' ')}
      >
        <BrandMark
          variant={productToBrand[product.id]}
          className="h-14 w-16 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 md:h-16 md:w-20"
        />

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
