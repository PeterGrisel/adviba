'use client';

import { motion } from 'framer-motion';
import { Check, RotateCcw } from 'lucide-react';
import { copy } from '@/data/configurator';

interface Props {
  onRestart: () => void;
}

export function SuccessState({ onRestart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-card border border-line bg-surface p-8 text-center md:p-12"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
        className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success text-surface"
      >
        <Check className="h-7 w-7" strokeWidth={2.5} />
      </motion.div>

      <h2 className="mt-6 font-display text-[28px] font-semibold tracking-tight text-ink md:text-[36px]">
        {copy.success.title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-muted">
        {copy.success.body}
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
        Start opnieuw
      </button>
    </motion.div>
  );
}
