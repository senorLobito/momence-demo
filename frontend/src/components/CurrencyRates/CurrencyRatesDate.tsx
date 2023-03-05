import React from "react";
import { RateDateBlock } from "../../styles/styles";

type DateProps = {
  ratesDate: string | undefined;
};

export default function CurrencyRateDate({ ratesDate }: DateProps): JSX.Element {
  return <RateDateBlock>last update: {ratesDate ? <strong>{ratesDate}</strong> : <>-</>}</RateDateBlock>;
}
