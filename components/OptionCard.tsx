'use client';

import { motion } from 'framer-motion';
import type { Option } from '@/lib/types';
import { formatCurrency } from '@/lib/calculatePrice';
import { Icon } from './IconRenderer';

interface Props {
  option: Option;
  selected: boolean;
  onToggle: () => void;
}

export function OptionCard({ option, selected, onToggle }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={selected}
      onClick={onToggle}
      className={[
        'group relative flex w-full items-center gap-4 rounded-card border bg-surface p-5 text-left transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        selected
          ? 'border-accent shadow-elevated ring-1 ring-accent'
          : 'border-line hover:border-ink/40 hover:shadow-card',
      ].join(' ')}
    >
      <div
        className={[
          'grid h-12 w-12 flex-none place-items-center rounded-full border transition-colors',
          selected ? 'border-accent bg-accent text-on-accent' : 'border-line bg-canvas text-ink',
        ].join(' ')}
      >
        <Icon name={option.icon} className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
          <h3 className="text-[16px] font-semibold tracking-tight text-ink">{option.name}</h3>
          <span className="text-[15px] font-semibold tabular-nums text-ink">
            + {formatCurrency(option.price)}
          </span>
        </div>
        <p className="mt-0.5 text-[14px] leading-relaxed text-ink-muted">
          {option.description}
        </p>
      </div>

      <div
        className={[
          'ml-2 flex-none rounded-full transition-all',
          'h-6 w-11 border',
          selected ? 'border-accent bg-accent' : 'border-line bg-canvas',
        ].join(' ')}
        aria-hidden
      >
        <motion.div
          initial={false}
          animate={{ x: selected ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={[
            'mt-[3px] h-4 w-4 rounded-full',
            selected ? 'bg-surface' : 'bg-ink-muted',
          ].join(' ')}
        />
      </div>
    </button>
  );
}
