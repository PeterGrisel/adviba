import { NextResponse } from 'next/server';
import { brand, products } from '@/data/configurator';
import { calculatePrice } from '@/lib/calculatePrice';
import type { Configuration, LeadFormData } from '@/lib/types';

export const runtime = 'nodejs';

/**
 * Ontvangt een aanvraag uit de configurator en stuurt hem door naar:
 *  - LEAD_WEBHOOK_URL  (n8n / Zapier / Make → Pipedrive e.d.), JSON POST
 *  - RESEND_API_KEY    (e-mail naar LEAD_EMAIL_TO, standaard brand.email)
 * Minstens één van beide moet ingesteld zijn; anders 503 en toont de
 * site het telefoonnummer als terugval. De prijs wordt hier opnieuw
 * berekend, zodat de client die niet kan manipuleren.
 */
export async function POST(req: Request) {
  let body: {
    lead?: Partial<LeadFormData>;
    config?: Configuration;
    company?: string; // honeypot
    source?: { page?: string; referrer?: string; query?: string };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Spam: bots vullen het verborgen veld in → doen alsof het gelukt is.
  if (body.company) return NextResponse.json({ ok: true });

  const lead = body.lead ?? {};
  const config = body.config;
  const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const clean = {
    firstName: str(lead.firstName, 80),
    lastName: str(lead.lastName, 80),
    email: str(lead.email, 160),
    phone: str(lead.phone, 40),
    postcode: str(lead.postcode, 10).toUpperCase(),
    consent: lead.consent === true,
  };
  const invalid =
    !clean.firstName ||
    !clean.lastName ||
    !/^\S+@\S+\.\S+$/.test(clean.email) ||
    !/^[\d+\s()-]{8,}$/.test(clean.phone) ||
    !/^\d{4}\s?[A-Z]{2}$/.test(clean.postcode) ||
    !clean.consent ||
    !config?.productId ||
    !(config.productId in products);
  if (invalid) return NextResponse.json({ error: 'invalid_lead' }, { status: 422 });

  const product = products[config.productId!];
  const execution = product.executions.find((e) => e.id === config.executionId);
  const options = product.options.filter((o) => config.optionIds?.includes(o.id));
  const price = calculatePrice(config);

  const payload = {
    receivedAt: new Date().toISOString(),
    lead: clean,
    configuration: {
      product: product.name,
      productId: product.id,
      execution: execution?.name ?? null,
      widthCm: config.width,
      heightCm: config.height,
      quantity: config.quantity,
      options: options.map((o) => o.name),
      indicativeTotalEur: Math.round(price.total),
    },
    source: {
      page: str(body.source?.page, 300),
      referrer: str(body.source?.referrer, 300),
      query: str(body.source?.query, 300),
    },
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  if (!webhook && !resendKey) {
    console.error('[lead] Geen LEAD_WEBHOOK_URL of RESEND_API_KEY ingesteld', payload);
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const jobs: Promise<Response>[] = [];
  if (webhook) {
    jobs.push(
      fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    );
  }
  if (resendKey) {
    jobs.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM ?? 'Maas en Waal configurator <onboarding@resend.dev>',
          to: (process.env.LEAD_EMAIL_TO ?? brand.email).split(',').map((s) => s.trim()),
          reply_to: clean.email,
          subject: `Nieuwe aanvraag: ${product.name}, ${clean.firstName} ${clean.lastName} (${clean.postcode})`,
          text: emailText(payload),
        }),
      })
    );
  }

  const results = await Promise.allSettled(jobs);
  const delivered = results.some((r) => r.status === 'fulfilled' && r.value.ok);
  if (!delivered) {
    console.error('[lead] Doorsturen mislukt', results, payload);
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

function emailText(p: {
  lead: Record<string, string | boolean>;
  configuration: Record<string, unknown>;
  source: Record<string, string>;
}) {
  const c = p.configuration;
  return [
    `Naam: ${p.lead.firstName} ${p.lead.lastName}`,
    `E-mail: ${p.lead.email}`,
    `Telefoon: ${p.lead.phone}`,
    `Postcode: ${p.lead.postcode}`,
    '',
    `Product: ${c.product}`,
    `Uitvoering: ${c.execution ?? '—'}`,
    `Formaat: ${c.widthCm} × ${c.heightCm} cm, ${c.quantity} stuk(s)`,
    `Opties: ${(c.options as string[]).join(', ') || '—'}`,
    `Indicatieve prijs: € ${c.indicativeTotalEur} incl. btw`,
    '',
    `Pagina: ${p.source.page}`,
    `Via: ${p.source.referrer || 'direct'} ${p.source.query}`,
  ].join('\n');
}
