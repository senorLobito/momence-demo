import { CurrencyRateList } from "../types/CurrencyRateList";
import { API_PATHS, API_ROOT } from "../constants";

const fetchCurrencyRates = async (): Promise<CurrencyRateList> => {
  const data = await fetch(`${API_ROOT}/${API_PATHS.CURRENCY_RATES}/getRates`);
  return await data.json();
};

const CurrencyRateService = {
  fetchCurrencyRates,
};

export default CurrencyRateService;
