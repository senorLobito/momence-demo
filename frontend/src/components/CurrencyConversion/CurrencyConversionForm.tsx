import React, { useState } from "react";
import { FormBlock, MessageBlock } from "../../styles/styles";
import { Grid } from "@mui/material";
import CurrencyConversionResult from "./CurrencyConversionResult";
import { CurrencyRate } from "../../types/CurrencyRate";
import { MESSAGES } from "../../constants";
import { useCurrencyConversionService } from "../../contexts/CurrencyConversionService.context";
import { isADecimal } from "../../utils/NumericStringUtil";

const INITIAL_AMOUNT = "1.00";

type CurrencyConversionProps = {
  rates: Map<string, CurrencyRate>;
};

export type ConversionResult = {
  result: string;
  currency: string;
};

export default function CurrencyConversionForm({ rates }: CurrencyConversionProps): JSX.Element {
  const currencyConversionService = useCurrencyConversionService();

  const [amount, setAmount] = useState<string | undefined>(INITIAL_AMOUNT);
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("");
  const [currency, setCurrency] = useState<string>(rates.entries().next().value[0]);
  const [conversionResult, setConversionResult] = useState<ConversionResult>({ result: "", currency: "" });
  const [generalErrorMsg, setGeneralErrorMsg] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const handleAmountBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (!value) {
      return;
    }

    setAmount(currencyConversionService.formatAmountForConversion(value));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCurrency(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setAmountErrorMsg("");
    setGeneralErrorMsg("");

    if (!amount || !isADecimal(amount)) {
      setAmountErrorMsg(MESSAGES.INVALID_VALUE);
      return;
    }

    if (!currency) {
      return;
    }

    const currencyRate = rates.get(currency);
    if (!currencyRate) {
      setGeneralErrorMsg(MESSAGES.CURRENCY_NOT_AVAILABLE);
    } else {
      const result = currencyConversionService.calculateConversion(parseFloat(amount), currencyRate.rate, currencyRate.amount).toFixed(3);
      setConversionResult({ result: result, currency: currency });
    }
  };

  if (generalErrorMsg) {
    return <MessageBlock>{generalErrorMsg}</MessageBlock>;
  }

  return (
    <>
      <FormBlock>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="stretch">
            <Grid item xs={4}>
              <label>Put amount in CZK</label>
              <input id="amountInput" type="text" value={amount === undefined ? "" : amount} onChange={handleAmountChange} onBlur={handleAmountBlur} />
              <div className="errorMessage">{amountErrorMsg}</div>
            </Grid>
            <Grid item xs={4}>
              <label>Select currency</label>
              <select id="currencyInput" onChange={handleCurrencyChange} value={currency}>
                {Array.from(rates.keys()).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={4}>
              <label className="hidden"></label>
              <button type="submit">Convert amount</button>
            </Grid>
          </Grid>
        </form>
      </FormBlock>
      <Grid item xs={12}>
        <CurrencyConversionResult {...conversionResult} />
      </Grid>
    </>
  );
}
