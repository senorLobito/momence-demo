import React from "react";
import { ConversionResultBlock } from "../../styles/styles";

type ConversionResultProps = {
  result: string | undefined;
  currency: string | undefined;
};

export default function CurrencyConversionResult({ result, currency }: ConversionResultProps): JSX.Element {
  return (
    <ConversionResultBlock>
      {result !== undefined && (
        <>
          <span>{result}</span>
          <span className="currency">{currency}</span>
        </>
      )}
    </ConversionResultBlock>
  );
}
