import { CurrencyRateList } from "../../types/CurrencyRateList";
import { API_PATHS, API_ROOT } from "../../constants";
import ICurrencyRateService from "./ICurrencyRate.service";

export default class CurrencyRateService implements ICurrencyRateService {
  async fetchCurrencyRates(): Promise<CurrencyRateList> {
    const data = await fetch(`${API_ROOT}/${API_PATHS.CURRENCY_RATES}/getRates`);
    return await data.json();
  }
}
