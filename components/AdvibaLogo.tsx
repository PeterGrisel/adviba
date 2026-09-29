'use client';

import { useState } from 'react';
import { brand } from '@/data/configurator';

/**
 * Het ADviba-logo op een lichte plaat, zodat het op donkere vlakken leesbaar
 * blijft. Laadt het logo niet, dan valt het terug op de woordnaam.
 */
export function AdvibaLogo({ className = 'h-5' }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="inline-flex items-center rounded-md bg-white px-1.5 py-1">
      {failed ? (
        <span className="font-display text-[13px] font-semibold leading-none tracking-tight text-ink">
          {brand.founder}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.founderLogo}
          alt={brand.founder}
          className={`${className} w-auto`}
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
