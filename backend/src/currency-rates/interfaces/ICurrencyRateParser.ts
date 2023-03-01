import { CurrencyRateList } from '../types/CurrencyRateList';

export default interface ICurrencyRateParser {
  parseRateDate();

  parseHeaders();

  parseRates();

  getParsedList(): CurrencyRateList;
}
