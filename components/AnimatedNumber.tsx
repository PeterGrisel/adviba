'use client';

import { useEffect, useRef, useState } from 'react';
import { formatCurrency } from '@/lib/calculatePrice';

interface Props {
  value: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Smoothly interpolates between currency values.
 * Uses requestAnimationFrame — no external animation lib overhead for this cheap case.
 */
export function AnimatedNumber({ value, duration = 450, className, as: Tag = 'span' }: Props) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;

    const step = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min(1, (timestamp - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = fromRef.current + (value - fromRef.current) * eased;
      setDisplay(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <Tag className={className}>{formatCurrency(Math.round(display))}</Tag>;
}
