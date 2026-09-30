import Image from 'next/image';

type Label = 'zonwering' | 'rolluiken' | 'horren';

interface Project {
  src: string;
  width: number;
  height: number;
  product: string;
  label: Label;
  alt: string;
}

/** Echte projecten van adviba (aangeleverd door adviba, klantgegevens weggesneden). */
const projects: Project[] = [
  { src: '/projects/rolluiken-achtergevel.jpg', width: 1200, height: 1483, product: 'Rolluiken', label: 'rolluiken', alt: 'Witte rolluiken op achtergevel en dakkapel van een rijwoning' },
  { src: '/projects/screens-gevel.jpg', width: 1140, height: 960, product: 'Screens', label: 'zonwering', alt: 'Grijze screens in een erker van een bakstenen woning' },
  { src: '/projects/markies-gevel.jpg', width: 1200, height: 1180, product: 'Markies', label: 'zonwering', alt: 'Antraciet gestreepte markies boven een benedenraam' },
  { src: '/projects/hor-dakraam.jpg', width: 1200, height: 1600, product: 'Dakraamhor', label: 'horren', alt: 'Hor en verduistering op een dakraam, van binnenuit gezien' },
  { src: '/projects/knikarmscherm-balkon.jpg', width: 1400, height: 1260, product: 'Knikarmscherm', label: 'zonwering', alt: 'Uitgeklapt knikarmscherm boven een balkon' },
  { src: '/projects/biroll-raam.jpg', width: 932, height: 1147, product: 'Biroll: hor en rolluik in één', label: 'horren', alt: 'Biroll met jaloezie-hor en rolluik in één, van binnenuit' },
  { src: '/projects/rolluik-tuinkamer.jpg', width: 1200, height: 1600, product: 'Rolluik', label: 'rolluiken', alt: 'Zwart rolluik voor de glazen pui van een tuinkamer' },
];

const dot: Record<Label, string> = {
  zonwering: 'bg-[#f5a623]',
  rolluiken: 'bg-brand-orange',
  horren: 'bg-brand-green',
};

export function ProjectGallery() {
  return (
    <section aria-labelledby="projecten-titel" className="border-t border-line bg-surface/60">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:mb-12 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Recent geplaatst
            </div>
            <h2
              id="projecten-titel"
              className="mt-4 font-display text-[26px] font-semibold leading-tight tracking-tight text-ink md:text-[36px]"
            >
              Echt werk van{' '}
              <span className="font-slab italic font-normal text-accent">adviba</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-ink-muted md:text-right">
            Geen stockfoto&apos;s: dit zijn woningen in de regio waar adviba zelf heeft ingemeten
            en gemonteerd.
          </p>
        </div>

        <div className="columns-2 gap-3 md:columns-3 md:gap-5">
          {projects.map((p) => (
            <figure
              key={p.src}
              className="group relative mb-3 break-inside-avoid overflow-hidden rounded-card border border-line bg-surface md:mb-5"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1152px) 360px, (min-width: 768px) 33vw, 50vw"
                quality={70}
                className="h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-3.5 pb-3 pt-10 text-[13px] font-medium text-white md:text-[14px]">
                <span className={`h-2 w-2 flex-none rounded-full ${dot[p.label]}`} aria-hidden />
                {p.product}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
