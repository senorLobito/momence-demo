import { CurrencyRate } from "../types/CurrencyRate";
import CurrencyConversionForm from "./CurrencyConversionForm";
import { Grid } from "@mui/material";
import { MessageBlock } from "../styles/styles";
import React from "react";
import {MESSAGES} from "../constants";

type CurrencyConversionProps = {
  currencyRates: CurrencyRate[] | undefined;
};

export default function CurrencyConversion(props: CurrencyConversionProps): JSX.Element {
  if (!props.currencyRates) {
    return (
      <Grid item mt={15} xs={10}>
        <MessageBlock>
          {MESSAGES.RATES_NOT_AVAILABLE}
        </MessageBlock>
      </Grid>
    );
  }

  return (
    <>
      {props.currencyRates && (
        <CurrencyConversionForm
          rates={new Map(props.currencyRates.map((rate) => [rate.code, rate]))}
        />
      )}
    </>
  );
}
