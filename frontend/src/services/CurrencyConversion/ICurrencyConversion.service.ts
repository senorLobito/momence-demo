export default interface ICurrencyConversionService {
  formatAmountForConversion(amount: string): string;
  calculateConversion(amount: number, currencyRate: number, currencyAmount: number): number;
};
