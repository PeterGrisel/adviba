'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { PriceLineItem } from '@/lib/types';
import { AnimatedNumber } from './AnimatedNumber';

interface Props {
  items: PriceLineItem[];
  total: number;
}

export function PriceBreakdown({ items, total }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-[13px] font-medium uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink"
      >
        <span>Prijsopbouw</span>
        <ChevronDown
          className={[
            'h-4 w-4 transition-transform duration-300',
            open ? 'rotate-180' : '',
          ].join(' ')}
          strokeWidth={1.75}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2 border-t border-line pt-3">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-3 text-[14px]"
                >
                  <div className="min-w-0">
                    <div className="text-ink">{item.label}</div>
                    {item.hint && (
                      <div className="text-[12px] text-ink-muted">{item.hint}</div>
                    )}
                  </div>
                  <AnimatedNumber
                    value={item.amount}
                    className="tabular-nums text-ink"
                  />
                </li>
              ))}
              <li className="flex items-baseline justify-between border-t border-line pt-3 text-[14px] font-semibold text-ink">
                <span>Totaal</span>
                <AnimatedNumber value={total} className="tabular-nums" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
