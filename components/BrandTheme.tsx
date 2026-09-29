'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import type { ProductId } from '@/lib/types';
import type { BrandVariant } from './BrandMark';

export const brandOrder: BrandVariant[] = ['zonwering', 'rolluiken', 'horren'];

export const productToBrand: Record<ProductId, BrandVariant> = {
  screens: 'zonwering',
  terrasoverkapping: 'zonwering',
  rolluiken: 'rolluiken',
  horren: 'horren',
};

export const brandToProduct: Record<BrandVariant, ProductId> = {
  zonwering: 'screens',
  rolluiken: 'rolluiken',
  horren: 'horren',
};

interface BrandTheme {
  brand: BrandVariant;
  setBrand: (b: BrandVariant | ((prev: BrandVariant) => BrandVariant)) => void;
  /** Bezoeker heeft zelf een merk/product gekozen → hero stopt met auto-wisselen. */
  interacted: boolean;
  markInteracted: () => void;
  /** Hero-CTA vraagt de configurator om dit product voor te selecteren. */
  requestedProduct: { id: ProductId; nonce: number } | null;
  requestProduct: (id: ProductId) => void;
}

const BrandThemeContext = createContext<BrandTheme | null>(null);

/**
 * Houdt het actieve sub-merk bij en zet `data-brand` op de pagina.
 * De accent-tokens in globals.css schakelen per merk mee, dus alles dat
 * `accent` / `accent-bright` gebruikt (header, configurator, footer) volgt.
 */
export function BrandThemeProvider({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [brand, setBrand] = useState<BrandVariant>('zonwering');
  const [interacted, setInteracted] = useState(false);
  const [requestedProduct, setRequested] = useState<BrandTheme['requestedProduct']>(null);

  const markInteracted = useCallback(() => setInteracted(true), []);
  const requestProduct = useCallback((id: ProductId) => {
    setRequested((r) => ({ id, nonce: (r?.nonce ?? 0) + 1 }));
  }, []);

  return (
    <BrandThemeContext.Provider
      value={{ brand, setBrand, interacted, markInteracted, requestedProduct, requestProduct }}
    >
      <main data-brand={brand} className={className}>
        {children}
      </main>
    </BrandThemeContext.Provider>
  );
}

export function useBrandTheme() {
  const ctx = useContext(BrandThemeContext);
  if (!ctx) throw new Error('useBrandTheme moet binnen BrandThemeProvider staan');
  return ctx;
}
