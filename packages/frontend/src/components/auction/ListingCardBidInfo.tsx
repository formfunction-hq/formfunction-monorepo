import { Dayjs } from "dayjs";
import styles from "css/auction/ListingCardBidInfo.module.css";
import TinyLabel from "components/text/TinyLabel";
import Price from "components/text/Price";
import ColorClass from "types/enums/ColorClass";
import dayjs from "utils/dates/dayjsex";
import TextSymbol from "types/enums/TextSymbol";

function LabelAndValue({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <div className={styles.labelAndValue}>
      <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
        {label}
      </TinyLabel>
      <Price colorClass={ColorClass.Primary}>{value}</Price>
    </div>
  );
}

type Props = {
  endDate: Dayjs;
  price: number;
};

export default function ListingCardBidInfo({
  endDate,
  price,
}: Props): JSX.Element {
  const diff = dayjs.duration(endDate.diff(dayjs()));

  return (
    <div className={styles.container}>
      <div className={styles.separator} />
      <div className={styles.priceAndDate}>
        <LabelAndValue
          label="Current Bid"
          value={`${price} ${TextSymbol.SolSymbol}`}
        />
        <LabelAndValue label="Ends In" value={diff.format("H[h] m[m] s[s]")} />
      </div>
    </div>
  );
}
