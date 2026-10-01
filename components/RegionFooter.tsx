'use client';

import { ArrowRight, CalendarDays, Clock, MapPin, Mail, Phone } from 'lucide-react';
import { brand, region } from '@/data/configurator';
import { AdvibaLogo } from './AdvibaLogo';
import { AlecAvatar } from './BelAlec';
import { WhatsAppIcon, whatsappHref } from './WhatsApp';
import { useBrandTheme } from './BrandTheme';
import type { ProductId } from '@/lib/types';

const serviceLinks: { label: string; href: string; product?: ProductId }[] = [
  { label: 'Zonwering & screens', href: '#configureer', product: 'screens' },
  { label: 'Rolluiken', href: '#configureer', product: 'rolluiken' },
  { label: 'Horren', href: '#configureer', product: 'horren' },
  { label: 'Terrasoverkappingen', href: '#configureer', product: 'terrasoverkapping' },
  { label: 'Werkgebied', href: '#werkgebied' },
];

export function RegionFooter({ children }: { children?: React.ReactNode }) {
  const { brand: active, markInteracted, requestProduct } = useBrandTheme();
  return (
    <footer>
      {/* Amber CTA-band — adviba stijl */}
      <a
        href={brand.helpPhoneHref}
        className="group block bg-accent-bright transition-[background-color,filter] duration-500 hover:brightness-110"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-5 py-4 text-center md:px-8 md:py-5">
          <AlecAvatar className="h-9 w-9 ring-dark/20 md:h-10 md:w-10" />
          <span className="font-display text-[16px] font-semibold text-dark md:text-[19px]">
            Persoonlijk advies uit de streek? Bel Alec van adviba.
          </span>
          <ArrowRight
            className="hidden h-5 w-5 flex-none text-dark transition-transform group-hover:translate-x-0.5 md:block"
            strokeWidth={2.5}
          />
        </div>
      </a>

      {/* Donker corpus */}
      <div className="bg-dark text-dark-fg">
        {children}
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-14">
            {/* Kolom 1 — merk + verhaal */}
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid h-11 w-11 place-items-center rounded-full border border-dark-line bg-dark-deep"
                >
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M2 7c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      className="text-accent-bright"
                    />
                    <path
                      d="M2 13c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      className="text-dark-fg"
                    />
                  </svg>
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-[20px] font-semibold tracking-tight text-dark-fg">
                    Maas{' '}
                    <span className="font-slab italic font-normal text-accent-bright">
                      en
                    </span>{' '}
                    Waal
                  </span>
                  <span className="text-[10.5px] uppercase tracking-[0.18em] text-dark-fg-muted">
                    {brand.suffix}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-[0.16em] text-dark-fg/70">
                  Onderdeel van
                </span>
                <AdvibaLogo className="h-7" />
              </div>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-dark-fg-muted">
                Op zoek naar zonwering in huis of zonwering buiten zoals rolluiken of
                screens? Als lokale streekspecialist tussen Dreumel en Ewijk zit{' '}
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener"
                  className="text-dark-fg underline decoration-accent-bright/60 underline-offset-2 transition-colors hover:text-accent-bright"
                >
                  adviba daglichtoplossingen
                </a> altijd om de hoek.
              </p>

              <div className="mt-8 flex flex-col gap-3 text-[15px]">
                <a
                  href={brand.helpPhoneHref}
                  className="group inline-flex items-center gap-3 text-dark-fg transition-colors hover:text-accent-bright"
                >
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-accent-bright text-dark transition-transform group-hover:scale-105">
                    <Phone className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  {brand.helpPhone}
                </a>
                <a
                  href={whatsappHref(active)}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-3 text-dark-fg transition-colors hover:text-[#25D366]"
                >
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white/5 transition-transform group-hover:scale-105">
                    <WhatsAppIcon className="h-6 w-6" />
                  </span>
                  WhatsApp ons
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="group inline-flex items-center gap-3 text-dark-fg transition-colors hover:text-accent-bright"
                >
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-accent-bright text-dark transition-transform group-hover:scale-105">
                    <Mail className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  {brand.email}
                </a>
              </div>

              <ul className="mt-6 space-y-2.5 text-[14px] text-dark-fg/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent-bright" strokeWidth={1.75} />
                  <span>
                    {brand.address}, {brand.postalCity}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 flex-none text-accent-bright" strokeWidth={1.75} />
                  <span>
                    {brand.hours}
                    <br />
                    {brand.showroom}
                  </span>
                </li>
              </ul>

              <a
                href={brand.appointmentUrl}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-accent-bright/60 px-5 text-[14px] font-medium text-dark-fg transition-colors hover:border-accent-bright hover:bg-accent-bright hover:text-dark"
              >
                <CalendarDays className="h-4 w-4" strokeWidth={1.75} />
                Plan een showroombezoek
              </a>
              <a
                href={brand.website}
                target="_blank"
                rel="noopener"
                className="mt-4 flex items-center gap-1.5 text-[14px] text-dark-fg/80 transition-colors hover:text-accent-bright"
              >
                Alle daglichtoplossingen bekijken op adviba.nl
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </div>

            {/* Kolom 2 — service & producten */}
            <div id="contact">
              <h3 className="font-display text-[18px] font-semibold text-accent-bright">
                Onze service en producten
              </h3>
              <ul className="mt-5 space-y-3">
                {serviceLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={() => {
                        if (!l.product) return;
                        markInteracted();
                        requestProduct(l.product);
                      }}
                      className="group inline-flex items-center gap-2.5 text-[15px] text-dark-fg transition-colors hover:text-accent-bright"
                    >
                      <span className="grid h-6 w-6 flex-none place-items-center rounded-full border border-accent-bright/70 text-accent-bright transition-all group-hover:bg-accent-bright group-hover:text-dark">
                        <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kolom 3 — werkgebied */}
            <div id="werkgebied">
              <h3 className="font-display text-[18px] font-semibold text-accent-bright">
                Werkgebied
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-dark-fg-muted">
                Van {region.villages[0]} aan de Maas tot{' '}
                {region.villages[region.villages.length - 1]} aan de Waal.
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {region.villages.map((v) => (
                  <li
                    key={v}
                    className="rounded-full border border-dark-line bg-dark-deep px-2.5 py-1 text-[12px] text-dark-fg-muted"
                  >
                    {v}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {brand.domains.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent-bright/40 bg-dark-deep px-2.5 py-1 text-[11px] font-medium text-accent-bright"
                  >
                    <MapPin className="h-3 w-3" strokeWidth={2} />
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Onderste band — nóg donkerder, © en credits */}
        <div className="border-t border-dark-line bg-dark-deep">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 py-6 text-[12px] text-dark-fg-muted md:flex-row md:items-center md:px-8">
            <div>
              © {new Date().getFullYear()} {brand.name} {brand.suffix}, een
              initiatief van{' '}
              <a
                href={brand.website}
                target="_blank"
                rel="noopener"
                className="text-dark-fg underline decoration-dark-fg/30 underline-offset-2 hover:text-accent-bright"
              >
                adviba uit Boven-Leeuwen
              </a>
              .
            </div>
            <div>Demo prijsconfigurator. Alle bedragen zijn indicatief.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
