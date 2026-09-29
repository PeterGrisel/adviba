'use client';

import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { LeadFormData } from '@/lib/types';
import { brand } from '@/data/configurator';

interface Props {
  /** Geeft true terug als de aanvraag is afgeleverd. */
  onSubmit: (data: LeadFormData, honeypot: string) => Promise<boolean>;
  onBack: () => void;
}

const empty: LeadFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  postcode: '',
  consent: false,
};

export function LeadForm({ onSubmit, onBack }: Props) {
  const [data, setData] = useState<LeadFormData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [honeypot, setHoneypot] = useState('');
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const update = <K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof LeadFormData, string>> = {};
    if (!data.firstName.trim()) next.firstName = 'Vul je voornaam in';
    if (!data.lastName.trim()) next.lastName = 'Vul je achternaam in';
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = 'Ongeldig e-mailadres';
    if (!/^[\d+\s()-]{8,}$/.test(data.phone)) next.phone = 'Vul een telefoonnummer in';
    if (!/^\d{4}\s?[a-zA-Z]{2}$/.test(data.postcode))
      next.postcode = 'Bijv. 1012 AB';
    if (!data.consent) next.consent = 'Toestemming is nodig';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || !validate()) return;
    setSending(true);
    setFailed(false);
    const ok = await onSubmit(data, honeypot);
    setSending(false);
    if (!ok) setFailed(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot tegen spambots — onzichtbaar voor mensen */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Bedrijf
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Voornaam"
          value={data.firstName}
          onChange={(v) => update('firstName', v)}
          error={errors.firstName}
          autoComplete="given-name"
        />
        <Field
          label="Achternaam"
          value={data.lastName}
          onChange={(v) => update('lastName', v)}
          error={errors.lastName}
          autoComplete="family-name"
        />
        <Field
          label="E-mail"
          type="email"
          value={data.email}
          onChange={(v) => update('email', v)}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Telefoon"
          type="tel"
          value={data.phone}
          onChange={(v) => update('phone', v)}
          error={errors.phone}
          autoComplete="tel"
        />
        <Field
          label="Postcode"
          value={data.postcode}
          onChange={(v) => update('postcode', v.toUpperCase())}
          error={errors.postcode}
          autoComplete="postal-code"
          className="sm:col-span-1"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-card border border-line bg-canvas p-4 transition-colors hover:bg-canvas/60">
        <input
          type="checkbox"
          checked={data.consent}
          onChange={(e) => update('consent', e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[rgb(var(--color-accent))]"
        />
        <span className="text-[14px] leading-relaxed text-ink">
          Ik ga akkoord dat adviba contact met mij opneemt over deze configuratie.
          {errors.consent && (
            <span className="mt-1 block text-[12px] text-[#B4463B]">{errors.consent}</span>
          )}
        </span>
      </label>

      {failed && (
        <p role="alert" className="rounded-card border border-[#B4463B]/40 bg-[#B4463B]/5 p-4 text-[14px] leading-relaxed text-ink">
          Versturen lukte niet. Bel of mail ons gerust direct:{' '}
          <a href={brand.helpPhoneHref} className="font-semibold underline">
            {brand.helpPhone}
          </a>{' '}
          of{' '}
          <a href={`mailto:${brand.email}`} className="font-semibold underline">
            {brand.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-[14px] font-medium text-ink-muted transition-colors hover:text-ink"
        >
          Pas configuratie aan
        </button>
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-on-accent transition-all hover:brightness-110 hover:shadow-elevated disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? 'Versturen…' : 'Stuur mijn prijsindicatie'}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
  className?: string;
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  error,
  autoComplete,
  className,
}: FieldProps) {
  const id = useId();
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className={[
          'mt-1.5 h-11 w-full rounded-lg border bg-surface px-3.5 text-[15px] text-ink outline-none transition-colors',
          error ? 'border-[#B4463B]' : 'border-line hover:border-ink/40 focus:border-ink',
        ].join(' ')}
      />
      {error && <div className="mt-1 text-[12px] text-[#B4463B]">{error}</div>}
    </div>
  );
}
