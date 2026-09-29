import type { Product, ProductId } from '@/lib/types';

export const brand = {
  name: 'Maas en Waal',
  suffix: 'Zonwering · Rolluiken · Horren',
  tagline: 'Van Heerewaarden tot Ewijk',
  founder: 'adviba',
  founderRole: 'Specialist uit de streek',
  domains: [
    'maasenwaalzonwering.nl',
    'maasenwaalrolluiken.nl',
    'maasenwaalhorren.nl',
  ],
  helpLabel: 'Persoonlijk advies',
  helpCta: 'Bel adviba',
  // Contactgegevens van adviba (bron: adviba.nl/contact)
  helpPhone: '+31 (0)6 10 26 00 00',
  helpPhoneHref: 'tel:+31610260000',
  email: 'info@adviba.nl',
  address: 'Expeditieweg 10-14',
  postalCity: '6657 KL Boven-Leeuwen',
  hours: 'Ma t/m vr 09:00 – 17:00',
  showroom: 'Showroom elke donderdag op afspraak',
  appointmentUrl: 'https://www.adviba.nl/book-appointment/',
  website: 'https://www.adviba.nl',
  socials: [
    'https://www.facebook.com/adviba.nl',
    'https://www.instagram.com/adviba_daglichtoplossingen',
  ],
};

/**
 * Werkgebied — dorpen en kernen in het Land van Maas en Waal
 * waarvoor de streekwebsite bedoeld is. Wordt getoond in de footer
 * en gebruikt voor postcode-context.
 */
export const region = {
  name: 'Land van Maas en Waal',
  villages: [
    'Heerewaarden',
    'Rossum',
    'Alphen',
    'Dreumel',
    'Maasbommel',
    'Wamel',
    'Beneden-Leeuwen',
    'Boven-Leeuwen',
    'Altforst',
    'Appeltern',
    'Puiflijk',
    'Afferden',
    'Deest',
    'Druten',
    'Horssen',
    'Bergharen',
    'Hernen',
    'Leur',
    'Batenburg',
    'Wijchen',
    'Winssen',
    'Beuningen',
    'Weurt',
    'Ewijk',
  ],
};

export const steps = [
  { id: 'type', label: 'Type' },
  { id: 'model', label: 'Model' },
  { id: 'format', label: 'Formaat' },
  { id: 'options', label: 'Opties' },
  { id: 'result', label: 'Resultaat' },
] as const;

export type StepId = (typeof steps)[number]['id'];

/**
 * All pricing and product data. UI must never hardcode prices — read from here.
 * Prices are indicative (demo) in EUR incl. btw.
 */
export const products: Record<ProductId, Product> = {
  screens: {
    id: 'screens',
    name: 'Screens',
    description: 'Comfort, privacy en bescherming tegen warmte.',
    longDescription:
      'Discrete zonwering die warmte weert en zicht behoudt. Perfect voor moderne architectuur waar strakke lijnen belangrijk zijn.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    basePrice: 795,
    pricePerM2: 115,
    dimensions: {
      minWidth: 50,
      maxWidth: 600,
      minHeight: 50,
      maxHeight: 400,
      minQuantity: 1,
      maxQuantity: 20,
    },
    executions: [
      {
        id: 'electric',
        name: 'Elektrisch',
        description: '230V motor. Stil en betrouwbaar.',
        price: 175,
        icon: 'Plug',
      },
      {
        id: 'solar',
        name: 'Solar',
        description: 'Volledig draadloos. Geen bekabeling nodig.',
        price: 295,
        icon: 'Sun',
      },
      {
        id: 'smart',
        name: 'Smart',
        description: 'App-bediening met automatisering.',
        price: 395,
        icon: 'Smartphone',
      },
    ],
    options: [
      {
        id: 'premiumFabric',
        name: 'Premium doek',
        description: 'Hoogwaardig doek met langere levensduur.',
        price: 145,
        icon: 'Layers',
      },
      {
        id: 'sensor',
        name: 'Wind- en zonsensor',
        description: 'Automatisch reageren op weersomstandigheden.',
        price: 225,
        icon: 'Wind',
      },
      {
        id: 'remote',
        name: 'Afstandsbediening',
        description: 'Bediening zonder app of schakelaar.',
        price: 85,
        icon: 'Radio',
      },
      {
        id: 'smartHome',
        name: 'Smart home koppeling',
        description: 'Werkt met Google Home en HomeKit.',
        price: 195,
        icon: 'Home',
      },
      {
        id: 'installation',
        name: 'Montage',
        description: 'Professionele installatie door specialist.',
        price: 495,
        icon: 'Wrench',
      },
    ],
  },
  rolluiken: {
    id: 'rolluiken',
    name: 'Rolluiken',
    description: 'Isolatie, veiligheid en verduistering in één.',
    longDescription:
      'Robuuste rolluiken die je woning beschermen en verduisteren. Beschikbaar met verhoogde isolatie voor slaapkamers.',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    basePrice: 895,
    pricePerM2: 135,
    dimensions: {
      minWidth: 50,
      maxWidth: 500,
      minHeight: 50,
      maxHeight: 350,
      minQuantity: 1,
      maxQuantity: 20,
    },
    executions: [
      {
        id: 'manual',
        name: 'Handbediening',
        description: 'Klassieke band of koord.',
        price: 0,
        icon: 'Hand',
      },
      {
        id: 'electric',
        name: 'Elektrisch',
        description: 'Stille buismotor met schakelaar.',
        price: 195,
        icon: 'Plug',
      },
      {
        id: 'smart',
        name: 'Smart',
        description: 'App-bediening en scenes.',
        price: 375,
        icon: 'Smartphone',
      },
    ],
    options: [
      {
        id: 'premiumFabric',
        name: 'Verhoogde isolatie',
        description: 'Extra geïsoleerde lamellen voor rustige nachten.',
        price: 175,
        icon: 'Layers',
      },
      {
        id: 'sensor',
        name: 'Timer & zonsensor',
        description: 'Automatisch openen en sluiten.',
        price: 195,
        icon: 'Wind',
      },
      {
        id: 'remote',
        name: 'Afstandsbediening',
        description: 'Draadloze bediening met één druk.',
        price: 85,
        icon: 'Radio',
      },
      {
        id: 'smartHome',
        name: 'Smart home koppeling',
        description: 'Werkt met Google Home en HomeKit.',
        price: 195,
        icon: 'Home',
      },
      {
        id: 'installation',
        name: 'Montage',
        description: 'Professionele installatie door specialist.',
        price: 425,
        icon: 'Wrench',
      },
    ],
  },
  horren: {
    id: 'horren',
    name: 'Horren',
    description: 'Frisse lucht binnen, insecten buiten.',
    longDescription:
      'Discrete horren die passen bij elk raam of deur. Bescherming tegen muggen, wespen en vliegen, zonder je zicht of daglicht op te offeren.',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
    basePrice: 245,
    pricePerM2: 85,
    dimensions: {
      minWidth: 40,
      maxWidth: 300,
      minHeight: 40,
      maxHeight: 260,
      minQuantity: 1,
      maxQuantity: 20,
    },
    executions: [
      {
        id: 'rol',
        name: 'Rolhor',
        description: 'Onzichtbaar in de cassette wanneer niet in gebruik.',
        price: 0,
        icon: 'Square',
      },
      {
        id: 'plisse',
        name: 'Plisséhor',
        description: 'Harmonica-doek, ideaal voor grote openingen.',
        price: 95,
        icon: 'Layers',
      },
      {
        id: 'schuif',
        name: 'Schuifhor',
        description: 'Robuust met aluminium frame, voor deuren.',
        price: 145,
        icon: 'SlidersHorizontal',
      },
    ],
    options: [
      {
        id: 'petMesh',
        name: 'Huisdier-gaas',
        description: 'Verstevigd gaas dat honden- en kattenklauwen weerstaat.',
        price: 65,
        icon: 'Wind',
      },
      {
        id: 'wideProfile',
        name: 'Extra breed profiel',
        description: 'Voor openingen breder dan 200 cm.',
        price: 85,
        icon: 'Layers',
      },
      {
        id: 'blackout',
        name: 'Verduisterend doek',
        description: 'Combineert hor met verduistering voor slaapkamers.',
        price: 145,
        icon: 'Home',
      },
      {
        id: 'remote',
        name: 'Kleursteun op maat',
        description: 'Aangepast RAL-nummer voor de profielen.',
        price: 55,
        icon: 'Radio',
      },
      {
        id: 'installation',
        name: 'Montage',
        description: 'Professionele installatie door specialist.',
        price: 295,
        icon: 'Wrench',
      },
    ],
  },
  terrasoverkapping: {
    id: 'terrasoverkapping',
    name: 'Terrasoverkapping',
    description: 'Een buitenkamer voor het hele jaar.',
    longDescription:
      'Een strakke aluminium overkapping die je terras verlengt tot een volwaardige buitenkamer. Optioneel met verwarming en verlichting.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    basePrice: 3495,
    pricePerM2: 185,
    dimensions: {
      minWidth: 200,
      maxWidth: 900,
      minHeight: 200,
      maxHeight: 500,
      minQuantity: 1,
      maxQuantity: 5,
    },
    executions: [
      {
        id: 'standaard',
        name: 'Standaard',
        description: 'Vast aluminium dak met heldere lijnen.',
        price: 0,
        icon: 'Square',
      },
      {
        id: 'geisoleerd',
        name: 'Geïsoleerd',
        description: 'Sandwichpanelen: minder warmte, minder geluid.',
        price: 695,
        icon: 'Layers',
      },
      {
        id: 'premium',
        name: 'Lamellendak',
        description: 'Verstelbare lamellen, elektrisch bediend.',
        price: 1495,
        icon: 'SlidersHorizontal',
      },
    ],
    options: [
      {
        id: 'ledLighting',
        name: 'LED verlichting',
        description: 'Sfeervolle inbouwspots met dimmer.',
        price: 395,
        icon: 'Lightbulb',
      },
      {
        id: 'heating',
        name: 'Terrasverwarming',
        description: 'Ingebouwde infraroodstralers.',
        price: 745,
        icon: 'Flame',
      },
      {
        id: 'sideWalls',
        name: 'Glazen zijwanden',
        description: 'Bescherming tegen wind zonder zicht te verliezen.',
        price: 1195,
        icon: 'Columns',
      },
      {
        id: 'smartHome',
        name: 'Smart home koppeling',
        description: 'Verlichting en dak in één app.',
        price: 245,
        icon: 'Home',
      },
      {
        id: 'installation',
        name: 'Montage',
        description: 'Volledige installatie inclusief fundering-check.',
        price: 1495,
        icon: 'Wrench',
      },
    ],
  },
};

export const productOrder: ProductId[] = [
  'screens',
  'rolluiken',
  'horren',
  'terrasoverkapping',
];

/**
 * Default configuration on first load / restart.
 */
export const defaultConfiguration = {
  productId: null,
  executionId: null,
  width: 250,
  height: 220,
  quantity: 1,
  optionIds: [],
};

export const copy = {
  eyebrow: 'Streekspecialist • Land van Maas en Waal',
  intro: {
    title: 'Configureer jouw zonwering of rolluik',
    subtitle:
      'Prijsindicatie in 2 minuten, voor iedereen tussen Heerewaarden en Ewijk.',
  },
  step1: {
    title: 'Wat wil je configureren?',
    subtitle: 'Kies de oplossing die het beste bij jouw woning past.',
  },
  step2: {
    title: 'Welke uitvoering past bij je?',
    subtitle: 'De uitvoering bepaalt bediening en comfort.',
  },
  step3: {
    title: 'Wat zijn ongeveer de afmetingen?',
    subtitle:
      'Een exacte inmeting doet adviba later gratis bij jou thuis in de streek.',
  },
  step4: {
    title: 'Maak je configuratie compleet',
    subtitle: 'Voeg de opties toe die bij jouw wensen passen.',
  },
  step5: {
    title: 'Jouw prijsindicatie is klaar',
    subtitle:
      'Op basis van jouw keuzes ligt de verwachte investering rond dit bedrag. adviba kijkt persoonlijk met je mee.',
  },
  summary: {
    title: 'Jouw configuratie',
    disclaimer:
      'Vrijblijvende prijsindicatie. De definitieve prijs volgt na een gratis inmeting bij jou thuis in Maas en Waal.',
    incl: 'Incl. btw',
  },
  success: {
    title: 'Gelukt! adviba neemt persoonlijk contact op.',
    body: 'Je aanvraag staat klaar. Als lokale streekspecialist plant adviba doorgaans binnen één werkdag een gratis inmeting bij jou thuis in.',
  },
};
