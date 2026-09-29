# Maas en Waal — Zonwering · Rolluiken · Horren

Streekconfigurator voor de drie Maas en Waal-merken (`maasenwaalzonwering.nl`,
`maasenwaalrolluiken.nl`, `maasenwaalhorren.nl`) — een initiatief van
**ADviba**, specialist tussen Heerewaarden en Ewijk.

Bezoekers doorlopen in vijf stappen een configuratie en krijgen direct een
indicatieve prijs. De demo draait volledig client-side; geen backend, geen
database.

![Next.js](https://img.shields.io/badge/Next.js-14-000?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss&logoColor=fff)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=fff)

---

## Starten

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Productie-build met
`npm run build && npm run start`.

Requirements: Node 18+.

---

## Wat zit erin

- **3-brand hero-slider** die automatisch cyclusseert tussen Zonwering
  (amber), Rolluiken (oranje) en Horren (groen). Achtergrondbeeld,
  kop-copy en accent-kleur wisselen synchroon. Auto-advance elke 6,5s,
  pauze bij hover, `prefers-reduced-motion` gerespecteerd.
- **5-staps configurator** (Type → Model → Formaat → Opties → Resultaat)
  met live prijsupdate. Framer Motion overgangen tussen stappen.
- **Pricing engine** — pure functie in
  [`lib/calculatePrice.ts`](lib/calculatePrice.ts). Neemt de configuratie,
  geeft een volledige breakdown terug (basis, oppervlakte, uitvoering,
  opties, montage, totaal + line items).
- **Alle prijsdata centraal** in
  [`data/configurator.ts`](data/configurator.ts). UI-componenten hardcoden
  geen bedragen — één plek om producten of prijzen te wijzigen.
- **localStorage-persistentie** onder `adviba.configurator.v1`. Sluiten en
  terugkomen behoudt de stap en keuzes; "Start opnieuw" wist alles.
- **Regionale sfeer** via een Waar-wij-thuis-zijn showcase met foto's uit
  Wikimedia Commons (CC BY-SA) en een werkgebied-strook met dorpen tussen
  Heerewaarden en Ewijk.
- **Donker ADviba-footer** met amber CTA-band, service-links en telefoon /
  e-mail.
- **Toegankelijkheid** — semantische HTML, keyboard-navigatie, zichtbare
  focus-states in de brand-accentkleur, minimale target-hoogte 44px,
  WCAG-contrast getest op alle brand-kleuren tegen de dark overlays.

---

## Techniek

| Onderdeel | Keuze |
|---|---|
| Framework | Next.js 14 (App Router, static output) |
| Taal | TypeScript strict |
| Styling | Tailwind CSS 3.4 met CSS-variabelen als bron |
| Animaties | Framer Motion 11 |
| Iconen | Lucide React |
| Fonts | Ubuntu · Roboto · Roboto Slab (Google Fonts) |
| Beelden | Wikimedia Commons `Special:FilePath` (stabiele originelen) |

Geen backend, geen database. Alles rendert statisch of client-side.

---

## Projectstructuur

```
adviba-configurator/
├── app/
│   ├── layout.tsx        # HTML shell + Google Fonts
│   ├── page.tsx          # Header + Hero + Configurator + Showcase + Footer
│   └── globals.css       # CSS-variabelen (palette, fonts, grain)
├── components/
│   ├── Configurator.tsx  # Main state machine, step transitions
│   ├── Hero.tsx          # 3-brand slider
│   ├── Header.tsx        # Sticky dark navy bar
│   ├── BrandMark.tsx     # SVG-logo (3 varianten: zonwering/rolluiken/horren)
│   ├── ProductCard.tsx   # Stap 1 keuze-cards
│   ├── ExecutionCard.tsx # Stap 2 uitvoering-cards
│   ├── DimensionInput.tsx / QuantitySelector.tsx  # Stap 3 inputs
│   ├── OptionCard.tsx    # Stap 4 toggle-cards
│   ├── ConfigurationSummary.tsx + PriceBreakdown.tsx
│   ├── LeadForm.tsx + SuccessState.tsx  # Stap 5 aanvraag
│   ├── RegionShowcase.tsx  # Streek-sfeerbeelden
│   └── RegionFooter.tsx    # Dark ADviba-stijl footer + CTA-band
├── data/
│   └── configurator.ts   # PRODUCTEN, PRIJZEN, COPY — de enige plek
├── lib/
│   ├── types.ts          # Configuration, PriceBreakdown, Product, ...
│   └── calculatePrice.ts # Pure pricing engine
└── tailwind.config.ts    # Kleur- en font-tokens
```

---

## Prijs- en productdata wijzigen

Open **`data/configurator.ts`** — één bestand voor alle domein-data:

```ts
export const products = {
  screens: {
    basePrice: 795,
    pricePerM2: 115,
    executions: [
      { id: 'solar', name: 'Solar', price: 295, ... },
      ...
    ],
    options: [
      { id: 'installation', name: 'Montage', price: 495, ... },
      ...
    ],
    dimensions: { minWidth: 50, maxWidth: 600, ... },
  },
  rolluiken: { ... },
  horren: { ... },
  terrasoverkapping: { ... },
};
```

De pricing engine (`lib/calculatePrice.ts`) rekent:

```
totaal = ( basePrice + (breedte × hoogte / 10000 × pricePerM2)
           + executionPrice + opties (excl. montage) ) × aantal
       + montagePrice
```

`Configuration → PriceBreakdown` is een pure functie — makkelijk te
unit-testen wanneer je er echte pricing-regels aan hangt.

---

## Brand-systeem

De drie merken delen één huismerk maar hebben elk eigen accent:

| Merk | Accent | Sublabel | Symbool |
|---|---|---|---|
| Zonwering | `#F5A623` amber | Comfort voor elk seizoen | Amber zonluifel-strips |
| Rolluiken | `#E8611F` oranje | Veilig, koel en rustig | Horizontale lamellen |
| Horren | `#5AA847` groen | Frisse lucht, zonder ongedierte | Mesh + blaadje |

De tokens leven in `app/globals.css` als CSS-variabelen en zijn via
`tailwind.config.ts` gemapt naar utility classes (`text-accent-bright`,
`bg-brand-orange`, `text-brand-green`, `bg-dark`, …). Palette wijzigen =
CSS-var wijzigen.

**Typografie:** Ubuntu (kopjes), Roboto (body), Roboto Slab italic voor
accent-woorden — allemaal gedestileerd uit ADviba's eigen Elementor-kit.

---

## Deploy

De app is een standaard Next.js 14 App-Router site zonder backend.

**Vercel** (eenvoudigst):

```bash
npx vercel
```

**Elke Node host** (Cloudflare Pages, Netlify, self-hosted):

```bash
npm run build
npm run start   # of gebruik de statische output onder .next/
```

Er zijn geen environment variables nodig; Wikimedia Commons wordt direct
via HTTPS aangesproken.

---

## Roadmap-ideeën

- [ ] Vervangende productfoto's per merk (nu Unsplash placeholders)
- [ ] Werkgebied-pagina per dorp (SEO)
- [ ] Lead-form doorzetten naar echte inbox (bijv. Resend / Loops)
- [ ] Tests op de pricing engine (`lib/calculatePrice.test.ts`)
- [ ] Sitemap + robots + `og:image` per brand

---

## Licentie

Broncode: privé demo — geen expliciete open source licentie.
Foto's in `components/RegionShowcase.tsx` en `components/Hero.tsx`:
Wikimedia Commons, CC BY-SA 3.0/4.0 — credits staan in de UI.
