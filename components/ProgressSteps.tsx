'use client';

import { motion } from 'framer-motion';
import { steps } from '@/data/configurator';

interface Props {
  currentStep: number;
  onStepClick?: (index: number) => void;
  maxReachedStep: number;
}

export function ProgressSteps({ currentStep, onStepClick, maxReachedStep }: Props) {
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute left-0 right-0 top-[10px] h-px bg-line" />
        <motion.div
          className="absolute left-0 top-[10px] h-px bg-ink"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <ol className="relative flex items-start justify-between">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isDone = index < currentStep;
            const isReachable = index <= maxReachedStep;

            return (
              <li key={step.id} className="flex flex-col items-center">
                <button
                  type="button"
                  disabled={!isReachable}
                  onClick={() => isReachable && onStepClick?.(index)}
                  className="group flex flex-col items-center gap-2 focus:outline-none disabled:cursor-not-allowed"
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Stap ${index + 1}: ${step.label}`}
                >
                  <span
                    className={[
                      'grid h-5 w-5 place-items-center rounded-full border transition-all',
                      isActive
                        ? 'border-ink bg-ink text-surface scale-110'
                        : isDone
                          ? 'border-ink bg-ink text-surface'
                          : 'border-line bg-surface text-ink-muted',
                    ].join(' ')}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  </span>
                  <span
                    className={[
                      'text-[11px] uppercase tracking-[0.14em] transition-colors',
                      isActive || isDone ? 'text-ink' : 'text-ink-muted',
                      'hidden sm:inline',
                    ].join(' ')}
                  >
                    {step.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-ink-muted sm:hidden">
        <span>Stap {currentStep + 1} / {steps.length}</span>
        <span className="text-ink">{steps[currentStep].label}</span>
      </div>
    </div>
  );
}
