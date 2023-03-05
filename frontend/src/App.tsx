import React from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container, Grid } from "@mui/material";
import CurrencyRates from "./components/CurrencyRates/CurrencyRates";
import CurrencyRateService from "./services/CurrencyRate/CurrencyRate.service";
import { CurrencyRateServiceProvider } from "./contexts/CurrencyRateService.context";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <div className="App">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Container fixed>
          <Grid container spacing={2} mb={5} direction="row" justifyContent="center" alignItems="center">
            <CurrencyRateServiceProvider service={new CurrencyRateService()}>
              <CurrencyRates />
            </CurrencyRateServiceProvider>
          </Grid>
        </Container>
      </QueryClientProvider>
    </div>
  );
}

export default App;
