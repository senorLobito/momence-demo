import {CurrencyRate} from "./CurrencyRate";

export type CurrencyRateList = {
  listDate: string;
  headers: string[];
  currencyRates: CurrencyRate[];
}