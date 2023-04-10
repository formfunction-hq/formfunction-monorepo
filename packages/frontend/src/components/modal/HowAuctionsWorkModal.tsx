import graphql from "babel-plugin-relay/macro";
import GenericModal from "components/modal/GenericModal";
import { HowAuctionsWorkModal_MetadataAccount$key } from "components/modal/__generated__/HowAuctionsWorkModal_MetadataAccount.graphql";
import ArtName from "components/text/ArtName";
import Body1 from "components/text/Body1";
import styles from "css/modal/HowAuctionsWorkModal.module.css";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import dayjs from "utils/dates/dayjsex";
import pluralize from "formfn-shared/dist/utils/pluralize";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import DEFAULT_PRICE_INCREMENT_PERCENTAGE from "constants/DefaultPriceIncrementPercentage";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";

const fragment = graphql`
  fragment HowAuctionsWorkModal_MetadataAccount on MetadataAccount {
    nft {
      auctionDurationInSeconds
      timeExtensionDurationInSeconds
      priceV2 {
        currencyInfo {
          decimals
          shortSymbol
          symbol
        }
      }

      tickSizeInfo {
        tickSizeConstantInLamports
      }
    }
  }
`;

function getPriceIncrementInfo(
  tickSizeConstantInFullDecimals: Maybe<number>,
  symbol: string,
  decimals: number
) {
  if (tickSizeConstantInFullDecimals == null) {
    return (
      `Each new bid must be at least ${DEFAULT_PRICE_INCREMENT_PERCENTAGE}% more than the current highest bid ` +
      `(the minimum being 0.1 ${symbol} or more). The minimum price difference is ` +
      `rounded down to the nearest 0.1 ${symbol}`
    );
  }

  return `Each new bid must be at least ${formatDecimals(
    tickSizeConstantInFullDecimals,
    decimals
  )} ${symbol} more than the current highest bid`;
}

function Section({ children, title }: { children: any; title: string }) {
  return (
    <div className={styles.section}>
      <ArtName colorClass={ColorClass.Primary}>{title}</ArtName>
      <Body1 colorClass={ColorClass.Secondary}>{children}</Body1>
    </div>
  );
}

type Props = {
  isShown: boolean;
  metadataAccount: HowAuctionsWorkModal_MetadataAccount$key;
  onHide: () => void;
};

export default function HowAuctionsWorkModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const {
    nft: {
      tickSizeInfo: { tickSizeConstantInLamports },
      priceV2,
    },
  } = metadataAccountData;
  const auctionTime = dayjs.duration(
    metadataAccountData.nft.auctionDurationInSeconds,
    "second"
  );
  const endTime = dayjs.duration(
    metadataAccountData.nft.timeExtensionDurationInSeconds,
    "second"
  );
  // Should be safe as this is only rendered when status is Listed or Auction
  const {
    currencyInfo: { decimals, symbol, shortSymbol },
  } = priceV2!;

  const body = (
    <div className={styles.sections}>
      <Body1 className={styles.note} colorClass={ColorClass.Secondary}>
        Note: each auction has its own duration and end time.
      </Body1>
      <Section title="Auction starts">
        A{" "}
        <span className={styles.emphasize}>
          {auctionTime.asHours()}-hour auction
        </span>{" "}
        will start after the first bid on this piece has been placed.
      </Section>
      <Section title="Bidding">
        {getPriceIncrementInfo(
          tickSizeConstantInLamports,
          shortSymbol ?? symbol,
          decimals
        )}
        . If you get outbid, you will be sent an email notification, and be
        automatically refunded.
        <br />
        <br />
        If a bid occurs within {endTime.asMinutes()}
        {pluralize("minute", endTime.asMinutes())} of the auction end time, the{" "}
        <span className={styles.emphasize}>
          auction countdown will be reset to {endTime.asMinutes()}
          {pluralize("minute", endTime.asMinutes())}
        </span>
        . This gives each buyer the opportunity to place a final bid.
        <br />
        <br />
        Please try not to wait until the final seconds to bid—if you bid at the
        last second, we can&apos;t guarantee your transaction will be
        successful.
      </Section>
      <Section title="Auction ends">
        After the {auctionTime.asHours()}-hour auction period ends, the highest
        bidder will win the auction. The creator settles the auction, which will
        transfer the NFT to the collector and the SOL from the winning bid to
        the creator.
      </Section>
    </div>
  );

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      title="How do auctions work?"
    >
      {body}
    </GenericModal>
  );
}
