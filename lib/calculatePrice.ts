import type { Configuration, PriceBreakdown, PriceLineItem } from '@/lib/types';
import { products } from '@/data/configurator';

/**
 * Compute a full price breakdown from a configuration.
 * Returns zeros when the product hasn't been chosen yet — safe to call at any step.
 */
export function calculatePrice(config: Configuration): PriceBreakdown {
  const empty: PriceBreakdown = {
    base: 0,
    area: 0,
    execution: 0,
    options: 0,
    installation: 0,
    subtotal: 0,
    total: 0,
    perUnit: 0,
    areaM2: 0,
    lineItems: [],
  };

  if (!config.productId) return empty;
  const product = products[config.productId];
  if (!product) return empty;

  const areaM2 = (config.width / 100) * (config.height / 100);
  const areaCost = Math.round(areaM2 * product.pricePerM2);

  const execution = config.executionId
    ? product.executions.find((e) => e.id === config.executionId)
    : undefined;
  const executionCost = execution?.price ?? 0;

  const chosenOptions = product.options.filter((o) => config.optionIds.includes(o.id));
  const installationOption = chosenOptions.find((o) => o.id === 'installation');
  const otherOptions = chosenOptions.filter((o) => o.id !== 'installation');
  const optionsCost = otherOptions.reduce((sum, o) => sum + o.price, 0);
  const installationCost = installationOption?.price ?? 0;

  const perUnit = product.basePrice + areaCost + executionCost + optionsCost;
  const subtotal = perUnit * config.quantity + installationCost;
  const total = subtotal;

  const lineItems: PriceLineItem[] = [
    {
      label: 'Basisproduct',
      amount: product.basePrice * config.quantity,
      hint: config.quantity > 1 ? `${config.quantity} × € ${product.basePrice}` : undefined,
    },
    {
      label: 'Afmetingen',
      amount: areaCost * config.quantity,
      hint: `${formatArea(areaM2)} m² × € ${product.pricePerM2}/m²${
        config.quantity > 1 ? ` × ${config.quantity}` : ''
      }`,
    },
  ];

  if (execution && executionCost > 0) {
    lineItems.push({
      label: execution.name,
      amount: executionCost * config.quantity,
      hint: config.quantity > 1 ? `${config.quantity} × € ${executionCost}` : undefined,
    });
  }

  if (otherOptions.length > 0) {
    lineItems.push({
      label: 'Extra opties',
      amount: optionsCost * config.quantity,
      hint: otherOptions.map((o) => o.name).join(', '),
    });
  }

  if (installationOption) {
    lineItems.push({
      label: 'Montage',
      amount: installationCost,
    });
  }

  return {
    base: product.basePrice,
    area: areaCost,
    execution: executionCost,
    options: optionsCost,
    installation: installationCost,
    subtotal,
    total,
    perUnit,
    areaM2,
    lineItems,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatArea(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}
