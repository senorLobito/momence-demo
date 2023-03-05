import React from "react";
import ICurrencyRateService from "../services/CurrencyRate/ICurrencyRate.service";

const CurrencyRateServiceContext = React.createContext<ICurrencyRateService | null>(null);

type CurrencyRateServiceProviderProps = {
  service: ICurrencyRateService;
  children: React.ReactNode;
};

export function CurrencyRateServiceProvider({ service, children }: CurrencyRateServiceProviderProps): JSX.Element {
  return <CurrencyRateServiceContext.Provider value={service}>{children}</CurrencyRateServiceContext.Provider>;
}

export function useCurrencyRateService(): ICurrencyRateService {
  const service = React.useContext(CurrencyRateServiceContext);
  if (!service) {
    throw new Error("An error occured while using CurencyRateService context.");
  }

  return service;
}
