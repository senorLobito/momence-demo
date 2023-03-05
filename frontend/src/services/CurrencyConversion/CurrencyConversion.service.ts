import ICurrencyConversionService from "./ICurrencyConversion.service";
import { hasFloatingPoint } from "../../utils/NumericStringUtil";

export default class CurrencyConversionService implements ICurrencyConversionService {
  formatAmountForConversion(amount: string): string {
    if (isNaN(Number(amount))) {
      return amount;
    }

    if (hasFloatingPoint(amount)) {
      // values with dot (.) as a first character
      return Number(amount).toString();
    }

    return `${amount}.00`;
  }

  calculateConversion(amount: number, currencyRate: number, currencyAmount: number): number {
    return (amount / currencyRate) * currencyAmount;
  }
}
