import MaybeImgix from "components/images/MaybeImgix";
import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import Body2 from "components/text/Body2";
import Price from "components/text/Price";
import styles from "css/auction/BidCard.module.css";
import { Dayjs } from "dayjs";
import useExchangeRatesContext from "hooks/useExchangeRatesContext";
import Imgix from "react-imgix";
import ColorClass from "types/enums/ColorClass";
import TextSymbol from "types/enums/TextSymbol";

function BidLine({
  artistName,
  artistSrc,
  isListing,
}: {
  artistName: string;
  artistSrc: string;
  isListing: boolean;
}) {
  return (
    <Body1 colorClass={ColorClass.Primary} className={styles.bidLine}>
      {isListing ? "Listed by " : "Bid from "}
      <MaybeImgix src={artistSrc}>
        <Imgix className={styles.image} src={artistSrc} width={32} />
        <img className={styles.image} src={artistSrc} />
      </MaybeImgix>
      <Body1Medium colorClass={ColorClass.Primary} display="inline">
        {artistName}
      </Body1Medium>
    </Body1>
  );
}

type Props = {
  artistName: string;
  artistSrc: string;
  date: Dayjs;
  isListing?: boolean;
  price: number;
};

export default function BidCard({
  artistName,
  artistSrc,
  date,
  isListing = false,
  price,
}: Props): JSX.Element {
  const { priceToUsd } = useExchangeRatesContext();
  const usdPrice = priceToUsd(price, "Solana");

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <BidLine
          artistName={artistName}
          artistSrc={artistSrc}
          isListing={isListing}
        />
        <Body2 colorClass={ColorClass.Secondary}>
          {date.format("MMM D, YYYY [at] h:mma")}
        </Body2>
      </div>
      <div className={styles.right}>
        <Price colorClass={ColorClass.Primary}>
          {price} {TextSymbol.SolSymbol}
        </Price>
        {usdPrice != null ? (
          <Body2 colorClass={ColorClass.Secondary}>${usdPrice} USD</Body2>
        ) : null}
      </div>
    </div>
  );
}
