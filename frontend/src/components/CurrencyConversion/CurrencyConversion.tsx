import { CurrencyRate } from "../../types/CurrencyRate";
import CurrencyConversionForm from "./CurrencyConversionForm";
import { Grid } from "@mui/material";
import { MessageBlock } from "../../styles/styles";
import React from "react";
import { MESSAGES } from "../../constants";
import { CurrencyConversionServiceProvider } from "../../contexts/CurrencyConversionService.context";
import CurrencyConversionService from "../../services/CurrencyConversion/CurrencyConversion.service";

type CurrencyConversionProps = {
  currencyRates: CurrencyRate[] | undefined;
};

export default function CurrencyConversion({ currencyRates }: CurrencyConversionProps): JSX.Element {
  if (!currencyRates) {
    return (
      <Grid item mt={15} xs={10}>
        <MessageBlock>{MESSAGES.RATES_NOT_AVAILABLE}</MessageBlock>
      </Grid>
    );
  }

  return (
    <CurrencyConversionServiceProvider service={new CurrencyConversionService()}>
      {currencyRates && <CurrencyConversionForm rates={new Map(currencyRates.map((rate) => [rate.code, rate]))} />}
    </CurrencyConversionServiceProvider>
  );
}
