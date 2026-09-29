'use client';

import { Info } from 'lucide-react';
import type { Configuration } from '@/lib/types';
import { copy, products } from '@/data/configurator';
import { calculatePrice, formatArea } from '@/lib/calculatePrice';
import { AnimatedNumber } from './AnimatedNumber';
import { PriceBreakdown } from './PriceBreakdown';

interface Props {
  config: Configuration;
  variant?: 'sticky' | 'inline';
}

export function ConfigurationSummary({ config, variant = 'sticky' }: Props) {
  const product = config.productId ? products[config.productId] : null;
  const execution =
    product && config.executionId
      ? product.executions.find((e) => e.id === config.executionId)
      : null;
  const selectedOptions = product
    ? product.options.filter((o) => config.optionIds.includes(o.id))
    : [];
  const breakdown = calculatePrice(config);

  const wrapperClass =
    variant === 'sticky'
      ? 'rounded-card border border-line bg-surface p-6 md:sticky md:top-24'
      : 'rounded-card border border-line bg-surface p-6';

  return (
    <aside className={wrapperClass} aria-label="Jouw configuratie">
      <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-muted">
        {copy.summary.title}
      </h2>

      <dl className="mt-4 space-y-3">
        <SummaryRow label="Product" value={product?.name ?? '—'} />
        <SummaryRow label="Uitvoering" value={execution?.name ?? '—'} />
        <SummaryRow
          label="Formaat"
          value={
            product
              ? `${config.width} × ${config.height} cm`
              : '—'
          }
          hint={product ? `${formatArea(breakdown.areaM2)} m²` : undefined}
        />
        <SummaryRow
          label="Aantal"
          value={config.quantity > 0 ? `${config.quantity} ${config.quantity === 1 ? 'stuk' : 'stuks'}` : '—'}
        />
      </dl>

      {selectedOptions.length > 0 && (
        <>
          <div className="my-5 h-px bg-line" />
          <div className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-muted">
            Opties
          </div>
          <ul className="mt-3 space-y-2">
            {selectedOptions.map((o) => (
              <li key={o.id} className="flex items-center gap-2 text-[15px] text-ink">
                <span
                  className="h-1.5 w-1.5 flex-none rounded-full bg-accent"
                  aria-hidden
                />
                {o.name}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="my-5 h-px bg-line" />

      <div>
        <div className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-muted">
          Indicatieve prijs
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <AnimatedNumber
            value={breakdown.total}
            className="font-display text-4xl font-semibold tracking-tight text-ink tabular-nums md:text-[46px] md:leading-[1.05]"
          />
        </div>
        <div className="mt-1 text-[13px] text-ink-muted">{copy.summary.incl}</div>
      </div>

      {breakdown.total > 0 && (
        <div className="mt-5">
          <PriceBreakdown items={breakdown.lineItems} total={breakdown.total} />
        </div>
      )}

      <p className="mt-5 flex items-start gap-2 text-[13px] leading-relaxed text-ink-muted">
        <Info className="mt-0.5 h-3.5 w-3.5 flex-none" strokeWidth={1.75} />
        <span>{copy.summary.disclaimer}</span>
      </p>
    </aside>
  );
}

function SummaryRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[13px] text-ink-muted">{label}</dt>
      <dd className="text-right text-[15px] font-medium text-ink">
        {value}
        {hint && <div className="text-[12px] font-normal text-ink-muted">{hint}</div>}
      </dd>
    </div>
  );
}
