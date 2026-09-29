'use client';

import { useId } from 'react';

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function DimensionInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit = 'cm',
  onChange,
}: Props) {
  const id = useId();

  const clamp = (v: number) => Math.max(min, Math.min(max, v));

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-muted">
          {label}
        </label>
        <span className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
          {min}–{max} {unit}
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            if (Number.isNaN(parsed)) return;
            onChange(clamp(parsed));
          }}
          onBlur={(e) => {
            const parsed = parseInt(e.target.value, 10);
            if (Number.isNaN(parsed)) {
              onChange(min);
            } else {
              onChange(clamp(parsed));
            }
          }}
          className="w-full bg-transparent text-4xl font-semibold tracking-tight text-ink outline-none tabular-nums md:text-5xl"
        />
        <span className="text-lg font-medium text-ink-muted">{unit}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="mt-4 w-full"
        aria-label={`${label} slider`}
      />
    </div>
  );
}
