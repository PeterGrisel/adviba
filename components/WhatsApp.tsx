import { brand } from '@/data/configurator';
import type { BrandVariant } from './BrandMark';

const onderwerp: Record<BrandVariant, string> = {
  zonwering: 'zonwering / screens',
  rolluiken: 'rolluiken',
  horren: 'horren',
};

/** wa.me-link met een alvast ingevuld bericht, passend bij het actieve merk. */
export function whatsappHref(merk?: BrandVariant) {
  const tekst = `Hoi Alec, ik heb een vraag over ${merk ? onderwerp[merk] : 'zonwering, rolluiken of horren'} (via maasenwaalzonwering.nl).`;
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(tekst)}`;
}

/** WhatsApp-beeldmerk: tekstballon met telefoon. */
export function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Z"
        fill="#25D366"
      />
      <path
        d="M9.1 7.4c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.2 3.5 5.4 4.8 2.7 1 3.2.8 3.8.8.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4l-1.9-.9c-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1Z"
        fill="#fff"
      />
    </svg>
  );
}
