import React, { useState } from "react";
import { CurrencyRateList } from "../../types/CurrencyRateList";
import { useQuery } from "react-query";
import { Grid } from "@mui/material";
import { H1, MessageBlock } from "../../styles/styles";
import CurrencyRatesDate from "./CurrencyRatesDate";
import CurrencyRatesList from "./CurrencyRatesList";
import CurrencyConversion from "../CurrencyConversion/CurrencyConversion";
import { MESSAGES } from "../../constants";
import { useCurrencyRateService } from "../../contexts/CurrencyRateService.context";

export default function CurrencyRates(): JSX.Element {
  const currencyRateService = useCurrencyRateService();
  const [rateData, setRateData] = useState<CurrencyRateList>();

  const { isLoading, error } = useQuery<CurrencyRateList, Error>("rateData", async () => await currencyRateService.fetchCurrencyRates(), {
    onSuccess: (data) => setRateData(data),
  });

  if (isLoading || !rateData) {
    return (
      <Grid item mt={15} xs={10}>
        <MessageBlock>{MESSAGES.LOADING}</MessageBlock>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid item mt={15} xs={10}>
        <MessageBlock>Error: {error.message}</MessageBlock>
      </Grid>
    );
  }

  return (
    <>
      <Grid container spacing={2} mb={3} direction="row" justifyContent="center" alignItems="baseLine">
        <Grid item xs={7}>
          <H1>Currency converter</H1>
        </Grid>
        <Grid item xs={3}>
          <CurrencyRatesDate ratesDate={rateData.listDate} />
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <CurrencyConversion currencyRates={rateData.currencyRates} />
      </Grid>
      <Grid item xs={10}>
        <CurrencyRatesList list={rateData} />
      </Grid>
    </>
  );
}
