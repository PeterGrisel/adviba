'use client';

import { useState } from 'react';
import Image from 'next/image';
import { brand } from '@/data/configurator';
import { imageSrc } from '@/lib/remoteImages';

/**
 * Het adviba-logo op een lichte plaat, zodat het op donkere vlakken leesbaar
 * blijft, als link naar adviba.nl (moedersite). Laadt het logo niet, dan
 * valt het terug op de woordnaam.
 */
export function AdvibaLogo({
  className = 'h-5',
  linked = true,
}: {
  className?: string;
  /** false als het logo al binnen een andere link staat */
  linked?: boolean;
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
      className="inline-flex items-center rounded-md bg-white px-1.5 py-1 transition-shadow hover:shadow-warm"
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
          className={`${className} w-auto`}
          onError={() => setFailed(true)}
        />
      )}
    </Wrapper>
  );
}
