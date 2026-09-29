export type ProductId = 'screens' | 'rolluiken' | 'terrasoverkapping' | 'horren';

export type ExecutionId =
  | 'electric'
  | 'solar'
  | 'smart'
  | 'manual'
  | 'standaard'
  | 'geisoleerd'
  | 'premium'
  | 'rol'
  | 'plisse'
  | 'schuif';

export type OptionId =
  | 'premiumFabric'
  | 'sensor'
  | 'remote'
  | 'smartHome'
  | 'installation'
  | 'ledLighting'
  | 'heating'
  | 'sideWalls'
  | 'insectScreen'
  | 'timer'
  | 'blackout'
  | 'petMesh'
  | 'wideProfile';

export interface Execution {
  id: ExecutionId;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface Option {
  id: OptionId;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface DimensionLimits {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  minQuantity: number;
  maxQuantity: number;
}

export interface Product {
  id: ProductId;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  basePrice: number;
  pricePerM2: number;
  executions: Execution[];
  options: Option[];
  dimensions: DimensionLimits;
}

export interface Configuration {
  productId: ProductId | null;
  executionId: ExecutionId | null;
  width: number;
  height: number;
  quantity: number;
  optionIds: OptionId[];
}

export interface PriceBreakdown {
  base: number;
  area: number;
  execution: number;
  options: number;
  installation: number;
  subtotal: number;
  total: number;
  perUnit: number;
  areaM2: number;
  lineItems: PriceLineItem[];
}

export interface PriceLineItem {
  label: string;
  amount: number;
  hint?: string;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  consent: boolean;
}
