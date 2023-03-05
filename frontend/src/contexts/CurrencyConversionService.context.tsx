import React from "react";
import ICurrencyConversionService from "../services/CurrencyConversion/ICurrencyConversion.service";

const CurrencyConversionServiceContext = React.createContext<ICurrencyConversionService | null>(null);

type CurrencyConversionServiceProviderProps = {
  service: ICurrencyConversionService;
  children: React.ReactNode;
};

export function CurrencyConversionServiceProvider({ service, children }: CurrencyConversionServiceProviderProps): JSX.Element {
  return <CurrencyConversionServiceContext.Provider value={service}>{children}</CurrencyConversionServiceContext.Provider>;
}

export function useCurrencyConversionService(): ICurrencyConversionService {
  const service = React.useContext(CurrencyConversionServiceContext);
  if (!service) {
    throw new Error("An error occured while using CurencyConversionService context.");
  }

  return service;
}
