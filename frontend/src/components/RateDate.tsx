import { RateDateBlock } from "../styles/styles";

type DateProps = {
  ratesDate: string | undefined;
};

export default function RateDate(props: DateProps) {
  return (
    <RateDateBlock>
      last update:{" "}
      {props.ratesDate ? <strong>{props.ratesDate}</strong> : <>-</>}
    </RateDateBlock>
  );
}
