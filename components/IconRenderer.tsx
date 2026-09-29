'use client';

import {
  Plug,
  Sun,
  Smartphone,
  Layers,
  Wind,
  Radio,
  Home,
  Wrench,
  Hand,
  Square,
  SlidersHorizontal,
  Lightbulb,
  Flame,
  Columns3,
  Check,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  Plug,
  Sun,
  Smartphone,
  Layers,
  Wind,
  Radio,
  Home,
  Wrench,
  Hand,
  Square,
  SlidersHorizontal,
  Lightbulb,
  Flame,
  Columns: Columns3,
  Check,
};

interface Props {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ name, className, strokeWidth = 1.5 }: Props) {
  const Cmp = icons[name] ?? Square;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
