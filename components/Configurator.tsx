'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import type {
  Configuration,
  ExecutionId,
  LeadFormData,
  OptionId,
  ProductId,
} from '@/lib/types';
import {
  copy,
  defaultConfiguration,
  productOrder,
  products,
  steps,
} from '@/data/configurator';
import { calculatePrice, formatArea, formatCurrency } from '@/lib/calculatePrice';
import { ProgressSteps } from './ProgressSteps';
import { ProductCard } from './ProductCard';
import { ExecutionCard } from './ExecutionCard';
import { DimensionInput } from './DimensionInput';
import { QuantitySelector } from './QuantitySelector';
import { OptionCard } from './OptionCard';
import { ConfigurationSummary } from './ConfigurationSummary';
import { LeadForm } from './LeadForm';
import { SuccessState } from './SuccessState';
import { AnimatedNumber } from './AnimatedNumber';
import { productToBrand, useBrandTheme } from './BrandTheme';

const STORAGE_KEY = 'adviba.configurator.v1';

type Status = 'configuring' | 'submitted';

export function Configurator() {
  const [step, setStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [status, setStatus] = useState<Status>('configuring');
  const [config, setConfig] = useState<Configuration>(defaultConfiguration as Configuration);
  const [hydrated, setHydrated] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { setBrand, markInteracted, requestedProduct } = useBrandTheme();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { config: Configuration; step: number };
        if (parsed.config) {
          setConfig({ ...defaultConfiguration, ...parsed.config } as Configuration);
          if (parsed.config.productId) setBrand(productToBrand[parsed.config.productId]);
        }
        if (typeof parsed.step === 'number' && parsed.step >= 0 && parsed.step < steps.length) {
          setStep(parsed.step);
          setMaxReached(parsed.step);
        }
      }
    } catch {
      // ignore malformed storage
    } finally {
      setHydrated(true);
    }
  }, [setBrand]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ config, step }));
    } catch {
      // ignore quota errors
    }
  }, [config, step, hydrated]);

  const product = config.productId ? products[config.productId] : null;
  const breakdown = useMemo(() => calculatePrice(config), [config]);

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return config.productId !== null;
      case 1:
        return config.executionId !== null;
      case 2: {
        if (!product) return false;
        const { minWidth, maxWidth, minHeight, maxHeight, minQuantity, maxQuantity } =
          product.dimensions;
        return (
          config.width >= minWidth &&
          config.width <= maxWidth &&
          config.height >= minHeight &&
          config.height <= maxHeight &&
          config.quantity >= minQuantity &&
          config.quantity <= maxQuantity
        );
      }
      case 3:
        return true;
      default:
        return false;
    }
  }, [step, config, product]);

  const goTo = (next: number) => {
    if (next < 0 || next >= steps.length) return;
    setDirection(next > step ? 1 : -1);
    setStep(next);
    setMaxReached((prev) => Math.max(prev, next));
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      // Scroll page to configurator top on mobile
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const next = () => canProceed && goTo(step + 1);
  const prev = () => goTo(Math.max(0, step - 1));

  const restart = () => {
    setConfig(defaultConfiguration as Configuration);
    setStep(0);
    setMaxReached(0);
    setStatus('configuring');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // ---- Handlers ----
  const selectProduct = (id: ProductId) => {
    setBrand(productToBrand[id]);
    markInteracted();
    if (config.productId === id) return;
    // Reset execution + options because they are product-specific
    setConfig((c) => ({
      ...c,
      productId: id,
      executionId: null,
      optionIds: [],
      width: products[id].dimensions.minWidth < 200 ? 250 : products[id].dimensions.minWidth,
      height: products[id].dimensions.minHeight < 200 ? 220 : products[id].dimensions.minHeight,
      quantity: 1,
    }));
  };

  // Hero-CTA "Configureer online" → product van het getoonde merk voorselecteren
  useEffect(() => {
    if (!requestedProduct || !hydrated || status !== 'configuring' || step !== 0) return;
    selectProduct(requestedProduct.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedProduct?.nonce]);

  const selectExecution = (id: ExecutionId) => {
    setConfig((c) => ({ ...c, executionId: id }));
  };

  const toggleOption = (id: OptionId) => {
    setConfig((c) => ({
      ...c,
      optionIds: c.optionIds.includes(id)
        ? c.optionIds.filter((x) => x !== id)
        : [...c.optionIds, id],
    }));
  };

  const handleLeadSubmit = async (lead: LeadFormData, honeypot: string) => {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          config,
          company: honeypot,
          source: {
            page: window.location.href,
            referrer: document.referrer,
            query: window.location.search,
          },
        }),
      });
      if (!res.ok) return false;
      setStatus('submitted');
      return true;
    } catch {
      return false;
    }
  };

  const stepVariants = {
    enter: (dir: 1 | -1) => ({ x: dir * 20, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 1 | -1) => ({ x: dir * -20, opacity: 0 }),
  };

  return (
    <div
      id="configureer"
      className="mx-auto max-w-6xl scroll-mt-[76px] px-5 py-10 md:px-8 md:py-14"
      ref={contentRef}
    >
      <header className="mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          Prijsindicatie in 2 minuten
        </div>
        <h2 className="mt-3 font-display text-[26px] font-semibold leading-[1.1] tracking-tight text-ink md:text-[36px]">
          Configureer jouw zonwering{' '}
          <span className="font-slab italic font-normal text-accent">of</span> rolluik
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-muted md:text-[16px]">
          Doorloop 4 korte stappen en zie direct hoe de indicatieve prijs meeloopt.
        </p>
      </header>

      <div className="mb-8 md:mb-10">
        <ProgressSteps
          currentStep={step}
          maxReachedStep={maxReached}
          onStepClick={goTo}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_320px] md:gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
        <div className="min-w-0 md:min-h-[480px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={status === 'submitted' ? 'submitted' : `step-${step}`}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {status === 'submitted' ? (
                <SuccessState onRestart={restart} />
              ) : step === 0 ? (
                <StepIntro
                  title={copy.step1.title}
                  subtitle={copy.step1.subtitle}
                >
                  <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
                    {productOrder.map((id) => (
                      <ProductCard
                        key={id}
                        product={products[id]}
                        selected={config.productId === id}
                        onSelect={() => selectProduct(id)}
                      />
                    ))}
                  </div>
                </StepIntro>
              ) : step === 1 && product ? (
                <StepIntro
                  title={copy.step2.title}
                  subtitle={copy.step2.subtitle}
                >
                  <div className="grid gap-4">
                    {product.executions.map((ex) => (
                      <ExecutionCard
                        key={ex.id}
                        execution={ex}
                        selected={config.executionId === ex.id}
                        onSelect={() => selectExecution(ex.id)}
                      />
                    ))}
                  </div>
                </StepIntro>
              ) : step === 2 && product ? (
                <StepIntro
                  title={copy.step3.title}
                  subtitle={copy.step3.subtitle}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <DimensionInput
                      label="Breedte"
                      value={config.width}
                      min={product.dimensions.minWidth}
                      max={product.dimensions.maxWidth}
                      onChange={(v) => setConfig((c) => ({ ...c, width: v }))}
                    />
                    <DimensionInput
                      label="Hoogte"
                      value={config.height}
                      min={product.dimensions.minHeight}
                      max={product.dimensions.maxHeight}
                      onChange={(v) => setConfig((c) => ({ ...c, height: v }))}
                    />
                    <QuantitySelector
                      label="Aantal"
                      value={config.quantity}
                      min={product.dimensions.minQuantity}
                      max={product.dimensions.maxQuantity}
                      onChange={(v) => setConfig((c) => ({ ...c, quantity: v }))}
                    />
                    <div className="rounded-card border border-line bg-surface p-5">
                      <div className="text-[13px] font-medium uppercase tracking-[0.12em] text-ink-muted">
                        Totale oppervlakte
                      </div>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-4xl font-semibold tracking-tight text-ink tabular-nums md:text-5xl">
                          {formatArea(breakdown.areaM2 * config.quantity)}
                        </span>
                        <span className="text-lg font-medium text-ink-muted">m²</span>
                      </div>
                      <div className="mt-4 text-[13px] leading-relaxed text-ink-muted">
                        {config.quantity} × {formatArea(breakdown.areaM2)} m² per stuk
                      </div>
                    </div>
                  </div>
                </StepIntro>
              ) : step === 3 && product ? (
                <StepIntro
                  title={copy.step4.title}
                  subtitle="Voeg de opties toe die bij jouw wensen passen."
                >
                  <div className="grid gap-4">
                    {product.options.map((o) => (
                      <OptionCard
                        key={o.id}
                        option={o}
                        selected={config.optionIds.includes(o.id)}
                        onToggle={() => toggleOption(o.id)}
                      />
                    ))}
                  </div>
                </StepIntro>
              ) : step === 4 ? (
                <ResultStep
                  config={config}
                  onSubmit={handleLeadSubmit}
                  onBack={prev}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>

          {status === 'configuring' && step < 4 && (
            <div className="mt-6 flex items-center justify-between md:mt-8">
              <button
                type="button"
                onClick={prev}
                disabled={step === 0}
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-5 text-[15px] font-medium text-ink transition-all hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line"
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                  strokeWidth={2}
                />
                Vorige
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!canProceed}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-on-accent transition-all hover:brightness-110 hover:shadow-elevated disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent disabled:hover:shadow-none"
              >
                {step === 3 ? 'Bekijk prijs' : 'Volgende'}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </button>
            </div>
          )}

          {status === 'configuring' && (
            <div className="mt-6 flex justify-center md:mt-8">
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 text-[13px] text-ink-muted transition-colors hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
                Start opnieuw
              </button>
            </div>
          )}
        </div>

        <div className="md:min-w-[320px]">
          <ConfigurationSummary config={config} />
        </div>
      </div>
    </div>
  );
}

function StepIntro({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-live="polite">
      <h3 className="font-display text-[22px] font-semibold leading-tight tracking-tight text-ink md:text-[28px]">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted md:text-[16px]">
        {subtitle}
      </p>
      <div className="mt-5 md:mt-6">{children}</div>
    </section>
  );
}

function ResultStep({
  config,
  onSubmit,
  onBack,
}: {
  config: Configuration;
  onSubmit: (data: LeadFormData, honeypot: string) => Promise<boolean>;
  onBack: () => void;
}) {
  const breakdown = calculatePrice(config);
  const product = config.productId ? products[config.productId] : null;
  const execution =
    product && config.executionId
      ? product.executions.find((e) => e.id === config.executionId)
      : null;
  const selectedOptions = product
    ? product.options.filter((o) => config.optionIds.includes(o.id))
    : [];

  return (
    <div className="space-y-8">
      <div className="rounded-card border border-line bg-surface p-8 md:p-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-canvas px-3 py-1 text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-success text-surface">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          {copy.step5.title}
        </div>

        <div className="mt-6 flex items-baseline gap-3">
          <AnimatedNumber
            value={breakdown.total}
            className="font-display text-5xl font-semibold tracking-tight text-ink tabular-nums md:text-[72px] md:leading-[1.02]"
          />
        </div>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-muted md:text-[16px]">
          {copy.step5.subtitle}
        </p>

        <div className="mt-8 grid gap-5 rounded-card border border-line bg-canvas p-6 sm:grid-cols-2">
          <ResultDetail label="Product" value={product?.name ?? '—'} />
          <ResultDetail label="Uitvoering" value={execution?.name ?? '—'} />
          <ResultDetail
            label="Formaat"
            value={`${config.width} × ${config.height} cm`}
            hint={`${formatArea(breakdown.areaM2)} m²`}
          />
          <ResultDetail
            label="Aantal"
            value={`${config.quantity} ${config.quantity === 1 ? 'stuk' : 'stuks'}`}
          />
          {selectedOptions.length > 0 && (
            <div className="sm:col-span-2">
              <div className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                Opties
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {selectedOptions.map((o) => (
                  <li
                    key={o.id}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-ink"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {o.name}
                    <span className="text-ink-muted">{formatCurrency(o.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-card border border-line bg-surface p-8 md:p-12">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-[28px]">
          Ontvang deze prijsindicatie
        </h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
          Vul je gegevens in en we sturen de configuratie inclusief indicatieve prijs naar je toe.
        </p>
        <div className="mt-6">
          <LeadForm onSubmit={onSubmit} onBack={onBack} />
        </div>
      </div>
    </div>
  );
}

function ResultDetail({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </div>
      <div className="mt-1 text-[16px] font-medium text-ink">{value}</div>
      {hint && <div className="text-[13px] text-ink-muted">{hint}</div>}
    </div>
  );
}
