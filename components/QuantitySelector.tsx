'use client';

import { Minus, Plus } from 'lucide-react';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({ label, value, min, max, onChange }: Props) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-muted">
          {label}
        </span>
        <span className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
          Max {max}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          aria-label="Aantal verlagen"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-all hover:border-ink hover:bg-ink hover:text-surface disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:bg-surface disabled:hover:text-ink"
        >
          <Minus className="h-4 w-4" strokeWidth={2} />
        </button>

        <div className="flex-1 text-center text-4xl font-semibold tabular-nums tracking-tight text-ink md:text-5xl">
          {value}
        </div>

        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label="Aantal verhogen"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink transition-all hover:border-ink hover:bg-ink hover:text-surface disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:bg-surface disabled:hover:text-ink"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
