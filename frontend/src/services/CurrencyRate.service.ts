import { CurrencyRateList } from "../types/CurrencyRateList";

const fetchCurrencyRates = async (): Promise<CurrencyRateList> => {
  const data = await fetch("currency-rates/getRates");
  return await data.json();
};

const CurrencyRateService = {
  fetchCurrencyRates,
};

export default CurrencyRateService;
