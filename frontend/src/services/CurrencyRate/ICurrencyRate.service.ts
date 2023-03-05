import { CurrencyRateList } from "../../types/CurrencyRateList";

export default interface ICurrencyRateService {
  fetchCurrencyRates(): Promise<CurrencyRateList>;
};
