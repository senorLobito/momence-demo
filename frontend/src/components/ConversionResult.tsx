import React from "react";
import { ConversionResultBlock } from "../styles/styles";

type ResultProps = {
  result: string | undefined;
  currency: string | undefined;
};

export default function ConversionResult(props: ResultProps): JSX.Element {
  return (
    <ConversionResultBlock>
      {props.result !== undefined && (
        <>
          <span>{props.result}</span>
          <span className="currency">{props.currency}</span>
        </>
      )}
    </ConversionResultBlock>
  );
}
