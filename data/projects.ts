import type { BrandVariant } from '@/components/BrandMark';

/**
 * Projectfoto's voor de slider "Bekijk onze projecten".
 *
 * Nieuwe foto toevoegen = bestand in /public/projects zetten. De slider pakt
 * elk .jpg/.jpeg/.png/.webp-bestand daar automatisch op (bij de build).
 * Noem het bestand <product>-<korte-omschrijving>.jpg, bijv.
 * "screens-jaren30-woning.jpg" of "rolluiken-wamel-achtergevel.jpg".
 * Het eerste woord bepaalt het product en de merkkleur (zie `productTypes`).
 *
 * Optioneel: vul hieronder bij `projectDetails` een titel, plaats of
 * alt-tekst in voor een betere omschrijving (en SEO).
 */

export interface ProjectPhoto {
  src: string;
  product: string;
  label: BrandVariant;
  title: string;
  alt: string;
  place?: string;
}

/** Eerste woord van de bestandsnaam → productnaam + merkkleur. */
export const productTypes: Record<string, { product: string; label: BrandVariant }> = {
  screens: { product: 'Screens', label: 'zonwering' },
  screen: { product: 'Screens', label: 'zonwering' },
  ritsscreens: { product: 'Ritsscreens', label: 'zonwering' },
  rolgordijn: { product: 'Rolgordijn', label: 'zonwering' },
  markies: { product: 'Markies', label: 'zonwering' },
  knikarmscherm: { product: 'Knikarmscherm', label: 'zonwering' },
  zonwering: { product: 'Zonwering', label: 'zonwering' },
  uitvalscherm: { product: 'Uitvalscherm', label: 'zonwering' },
  terrasoverkapping: { product: 'Terrasoverkapping', label: 'zonwering' },
  rolluiken: { product: 'Rolluiken', label: 'rolluiken' },
  rolluik: { product: 'Rolluik', label: 'rolluiken' },
  biroll: { product: 'Biroll', label: 'horren' },
  horren: { product: 'Horren', label: 'horren' },
  hor: { product: 'Hor', label: 'horren' },
  hordeur: { product: 'Hordeur', label: 'horren' },
};

/** Optionele extra info per bestandsnaam. */
export const projectDetails: Record<
  string,
  Partial<Pick<ProjectPhoto, 'title' | 'alt' | 'place' | 'product'>> & { order?: number }
> = {
  'rolluiken-achtergevel.jpg': {
    title: 'Rolluiken op achtergevel en dakkapel',
    alt: 'Witte rolluiken op achtergevel en dakkapel van een rijwoning',
    order: 1,
  },
  'screens-gevel.jpg': {
    title: 'Screens in de erker',
    alt: 'Grijze screens in een erker van een bakstenen woning',
    order: 2,
  },
  'markies-gevel.jpg': {
    title: 'Klassieke markies',
    alt: 'Antraciet gestreepte markies boven een benedenraam',
    order: 3,
  },
  'knikarmscherm-balkon.jpg': {
    title: 'Knikarmscherm op het balkon',
    alt: 'Uitgeklapt knikarmscherm boven een balkon',
    order: 4,
  },
  'hor-dakraam.jpg': {
    title: 'Hor op het dakraam',
    alt: 'Hor en verduistering op een dakraam, van binnenuit gezien',
    order: 5,
  },
  'biroll-raam.jpg': {
    product: 'Biroll',
    title: 'Hor en rolluik in één',
    alt: 'Biroll met jaloezie-hor en rolluik in één, van binnenuit',
    order: 6,
  },
  'rolluik-tuinkamer.jpg': {
    title: 'Rolluik voor de tuinkamer',
    alt: 'Zwart rolluik voor de glazen pui van een tuinkamer',
    order: 7,
  },
  'rolluiken-solar-somfy.jpg': {
    title: 'Rolluiken en Biroll op zonne-energie',
    alt: 'Witte rolluiken op zonne-energie van Somfy op een bakstenen gevel, met Biroll op de dakkapel',
    order: 8,
  },
  'ritsscreens-markies.jpg': {
    title: 'Ritsscreen en markies, op zonne-energie',
    alt: 'Grijs ritsscreen voor een benedenraam en een gestreepte markies op een jaren 30-woning',
    order: 9,
  },
  'hordeur-pendel-erfal.jpg': {
    title: 'Pendelhordeur met schopplaat',
    alt: 'Zwarte pendelhordeur van Erfal met metalen gaas en schopplaat in een bijkeuken',
    order: 10,
  },
  'screens-witte-woning.jpg': {
    title: 'Screens en rolluiken op een witte woning',
    alt: 'Witte woning met donkere screens en rolluiken',
    order: 11,
  },
  'rolluiken-solar-breed.jpg': {
    title: 'Rolluiken op zonne-energie, 3,7 meter breed',
    alt: 'Brede rolluiken op zonne-energie voor een moderne gevel',
    order: 12,
  },
  'rolgordijn-erfal.jpg': {
    title: 'Rolgordijn voor binnen',
    alt: 'Zandkleurig rolgordijn van Erfal met cassette voor een raam, binnenzonwering',
    order: 13,
  },
  'hor-inzet.jpg': {
    title: 'Inzethor',
    alt: 'Inzethor in een wit raam in een zwarte houten gevel',
    order: 14,
  },
  'hordeur-pendel-binnen.jpg': {
    title: 'Pendelhordeur, van binnenuit',
    alt: 'Pendelhordeur van Erfal met schopplaat, gezien vanuit de woning',
    order: 15,
  },
};

/** Maakt van een bestandsnaam een project, met nette fallbacks. */
export function toProject(file: string): ProjectPhoto {
  const base = file.replace(/\.[a-z]+$/i, '');
  const [first, ...rest] = base.toLowerCase().split(/[-_ ]+/);
  const type = productTypes[first] ?? { product: 'Zonwering', label: 'zonwering' as BrandVariant };
  const extra = projectDetails[file] ?? {};
  const words = rest.join(' ');
  const product = extra.product ?? type.product;
  const title = extra.title ?? (words ? `${product}: ${words}` : product);
  return {
    src: `/projects/${file}`,
    product,
    label: type.label,
    title,
    place: extra.place,
    alt: extra.alt ?? `${title}${extra.place ? ` in ${extra.place}` : ''}, geplaatst door adviba`,
  };
}

export function sortProjects(files: string[]): string[] {
  const order = (f: string) => projectDetails[f]?.order ?? 1000;
  return [...files].sort((a, b) => order(a) - order(b) || a.localeCompare(b));
}
