'use client';

import { useState } from 'react';
import Image from 'next/image';
import { brand } from '@/data/configurator';
import { imageSrc } from '@/lib/remoteImages';

/**
 * Het adviba-logo als link naar adviba.nl (moedersite). Op donkere vlakken
 * met een lichte plaat (plate), op lichte achtergronden zonder: dan blendt
 * het logo in de achtergrond. Laadt het logo niet, dan valt het terug op
 * de woordnaam.
 */
export function AdvibaLogo({
  className = 'h-5',
  linked = true,
  plate = true,
}: {
  className?: string;
  /** false als het logo al binnen een andere link staat */
  linked?: boolean;
  /** lichte plaat achter het logo; alleen nodig op donkere achtergronden */
  plate?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const Wrapper = linked ? 'a' : 'span';

  return (
    <Wrapper
      {...(linked && {
        href: brand.website,
        target: '_blank',
        rel: 'noopener',
        title: 'adviba daglichtoplossingen, showroom in Boven-Leeuwen',
      })}
      className={
        plate
          ? 'inline-flex items-center rounded-md bg-white px-1.5 py-1 transition-shadow hover:shadow-warm'
          : 'inline-flex items-center transition-opacity hover:opacity-80'
      }
    >
      {failed ? (
        <span className="font-display text-[13px] font-semibold leading-none tracking-tight text-ink">
          {brand.founder}
        </span>
      ) : (
        <Image
          src={imageSrc('adviba-logo')}
          alt="adviba daglichtoplossingen"
          width={1536}
          height={500}
          sizes="120px"
          className={`${className} w-auto ${plate ? '' : 'mix-blend-multiply'}`}
          onError={() => setFailed(true)}
        />
      )}
    </Wrapper>
  );
}
