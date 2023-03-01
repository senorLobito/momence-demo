import { Currency, CurrencyRate } from '../types/CurrencyRate';

export class CurrencyRateDto {
  country: string;
  currency: string;
  amount: number;
  code: Currency;
  rate: number;

  static toResponse(entity: CurrencyRate): CurrencyRateDto {
    return {
      country: entity.country,
      currency: entity.currency,
      amount: entity.amount,
      code: entity.code,
      rate: entity.rate,
    };
  }
}
