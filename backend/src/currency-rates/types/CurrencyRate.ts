export type CurrencyRate = {
  country: string;
  currency: string;
  amount: number;
  code: Currency;
  rate: number;
};
export enum Currency {
  AUD = "AUD",
  BRL = "BRL",
  BGN = "BGN",
  CAD = "CAD",
  CNY = "CNY",
  DKK = "DKK",
  EUR = "EUR",
  HKD = "HKD",
  HUF = "HUF",
  ISK = "ISK",
  XDR = "XDR",
  INR = "INR",
  IDR = "IDR",
  ILS = "ILS",
  JPY = "JPY",
  MYR = "MYR",
  MXN = "MXN",
  NZD = "NZD",
  NOK = "NOK",
  PHP = "PHP",
  PLN = "PLN",
  RON = "RON",
  SGD = "SGD",
  ZAR = "ZAR",
  KRW = "KRW",
  SEK = "SEK",
  CHF = "CHF",
  THB = "THB",
  TRY = "TRY",
  GBP = "GBP",
  USD = "USD",
}
