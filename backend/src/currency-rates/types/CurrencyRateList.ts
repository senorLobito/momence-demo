import { CurrencyRate } from './CurrencyRate';

export type CurrencyRateList = {
  listDate: Date;
  headers: string[];
  currencyRates: CurrencyRate[];
};
