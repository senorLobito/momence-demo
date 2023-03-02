import React from "react";
import { GridTable } from "../styles/styles";
import { CurrencyRateList } from "../types/CurrencyRateList";

type CurrencyListProps = {
  list: CurrencyRateList | undefined;
};

export default function CurrencyRatesList({ list }: CurrencyListProps) {
  return (
    <>
      {list && (
        <GridTable>
          <thead>
            <tr>
              {list?.headers?.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list?.currencyRates?.map((rate) => (
              <tr key={rate.code}>
                <td>{rate.country}</td>
                <td>{rate.currency}</td>
                <td>{rate.amount}</td>
                <td>{rate.code}</td>
                <td>{rate.rate}</td>
              </tr>
            ))}
          </tbody>
        </GridTable>
      )}
    </>
  );
}
