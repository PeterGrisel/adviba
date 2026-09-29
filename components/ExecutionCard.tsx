'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Execution } from '@/lib/types';
import { formatCurrency } from '@/lib/calculatePrice';
import { Icon } from './IconRenderer';

interface Props {
  execution: Execution;
  selected: boolean;
  onSelect: () => void;
}

export function ExecutionCard({ execution, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        'group relative flex w-full items-center gap-5 rounded-card border bg-surface p-5 text-left transition-all duration-300 md:p-6',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        selected
          ? 'border-accent shadow-elevated ring-1 ring-accent'
          : 'border-line hover:border-ink/40 hover:shadow-card',
      ].join(' ')}
    >
      <div
        className={[
          'grid h-14 w-14 flex-none place-items-center rounded-full border transition-colors',
          selected ? 'border-accent bg-accent text-on-accent' : 'border-line bg-canvas text-ink',
        ].join(' ')}
      >
        <Icon name={execution.icon} className="h-6 w-6" />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{execution.name}</h3>
        <p className="mt-0.5 text-[15px] leading-relaxed text-ink-muted">
          {execution.description}
        </p>
      </div>

      <div className="hidden text-right sm:block">
        <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          {execution.price === 0 ? 'Standaard' : 'Vanaf'}
        </div>
        <div className="text-base font-semibold tracking-tight text-ink">
          {execution.price === 0 ? 'Inbegrepen' : `+ ${formatCurrency(execution.price)}`}
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1 : 0.7,
        }}
        transition={{ duration: 0.2 }}
        className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-accent text-on-accent shadow-elevated"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
      </motion.div>
    </button>
  );
}
