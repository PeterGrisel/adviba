# ADviba Configurator

Premium demo-configurator voor ADviba. Gebouwd met Next.js 14, TypeScript, Tailwind CSS, Framer Motion en Lucide icons.

## Starten

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structuur

- `app/` — Next.js App Router (layout, page, globale styles)
- `components/` — UI-componenten (Configurator, ProgressSteps, ProductCard, …)
- `lib/` — Types en pricing engine (`calculatePrice.ts`)
- `data/configurator.ts` — Alle producten, uitvoeringen, opties en prijzen. Pas hier aan.

Alle prijzen leven centraal in `data/configurator.ts`. UI-componenten hardcoderen geen bedragen.

## Configuratie bewaren

De huidige stap en keuzes worden bewaard in `localStorage` onder `adviba.configurator.v1`. "Start opnieuw" wist deze data.
