import React, { useState } from "react";
import { FormBlock, MessageBlock } from "../styles/styles";
import { Grid } from "@mui/material";
import ConversionResult from "./ConversionResult";
import { CurrencyRate } from "../types/CurrencyRate";
import {MESSAGES} from "../constants";

const INITIAL_AMOUNT = "1.00";

type CurrencyConversionProps = {
  rates: Map<string, CurrencyRate>;
};

export default function CurrencyConversionForm(props: CurrencyConversionProps) {
  const [amount, setAmount] = useState<string | undefined>(INITIAL_AMOUNT);
  const [amountErrorMsg, setAmountErrorMsg] = useState<string>("");
  const [currency, setCurrency] = useState<string>(props.rates.entries().next().value[0]);
  const [conversionResult, setConversionResult] = useState<string | undefined>(undefined)
  const [conversionCurrency, setConversionCurrency] = useState<string | undefined>(undefined);
  const [generalErrorMsg, setGeneralErrorMsg] = useState<string>("");

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const onCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAmountErrorMsg("");
    setGeneralErrorMsg("");

    if (!amount || !/^-?\d*\.?\d*$/.test(amount)) {
      setAmountErrorMsg(MESSAGES.INVALID_VALUE);
      return;
    }

    if (!currency) {
      return;
    }

    calculateConversion(currency, amount);
  };

  const calculateConversion = (currency: string, amount: string) => {
    const currencyRate = props.rates.get(currency);
    if (currencyRate) {
      const result = (
        (parseFloat(amount) / currencyRate.rate) *
        currencyRate.amount
      ).toFixed(3);
      setConversionResult(result);
      setConversionCurrency(currency);
    } else {
      setGeneralErrorMsg(MESSAGES.CURRENCY_NOT_AVAILABLE);
    }
  };

  if (generalErrorMsg) {
    return <MessageBlock>{generalErrorMsg}</MessageBlock>;
  }

  return (
    <>
      <FormBlock>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item xs={4}>
              <label>Put amount in CZK</label>
              <input
                id="amountInput"
                type="text"
                value={amount === undefined ? "" : amount}
                onChange={onAmountChange}
              />
              <div className="errorMessage">{amountErrorMsg}</div>
            </Grid>
            <Grid item xs={4}>
              <label>Select currency</label>
              <select
                id="currencyInput"
                onChange={onCurrencyChange}
                value={currency}
              >
                {Array.from(props.rates.keys()).map((code) => (
                  <option key={code} value={code}>{code}</option>
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
        <ConversionResult
          result={conversionResult}
          currency={conversionCurrency}
        />
      </Grid>
    </>
  );
}
