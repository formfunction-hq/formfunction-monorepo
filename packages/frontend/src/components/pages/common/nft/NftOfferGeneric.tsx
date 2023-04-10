import styles from "css/pages/common/nft/NftOfferGeneric.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import Body2 from "components/text/Body2";
import formatTransactionTimestamp from "utils/dates/formatTransactionTimestamp";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import FontClass from "types/enums/FontClass";
import ProfileLink from "components/pages/common/nft/ProfileLink";
import TxLink from "components/pages/common/nft/TxLink";
import dayjs from "utils/dates/dayjsex";
import pluralize from "formfn-shared/dist/utils/pluralize";
import NftTransactionComment from "components/pages/common/nft/NftTransactionComment";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import {
  NftOfferGeneric_NftTransactionExpress$data,
  NftOfferGeneric_NftTransactionExpress$key,
} from "components/pages/common/nft/__generated__/NftOfferGeneric_NftTransactionExpress.graphql";
import joinClasses from "utils/joinClasses";
import useBreakpoint from "hooks/useBreakpoint";
import PriceWithSymbol from "components/price/PriceWithSymbol";
import Body1 from "components/text/Body1";

function ExpirationDate({ date }: { date: dayjs.Dayjs }): JSX.Element {
  const now = dayjs();
  // Round to nearest integer rather than simply rounding down by default
  // e.g., 2.9 -> 3 instead of 2
  // e.g., 2.49 -> 2
  const diffInDays = Math.round(date.diff(now, "days", true));
  const diffInHours = date.diff(now, "hours", false);
  const diffInMinutes = date.diff(now, "minutes", false);
  if (diffInHours > 24) {
    return (
      <Body2
        colorClass={ColorClass.Secondary}
      >{`Expires in ${diffInDays} ${pluralize("day", diffInDays)}`}</Body2>
    );
  }

  if (diffInMinutes > 60) {
    return (
      <Body2
        colorClass={ColorClass.Secondary}
      >{`Expires in ${diffInHours} ${pluralize("hour", diffInHours)}`}</Body2>
    );
  }
  if (diffInMinutes > 0) {
    return (
      <Body2
        colorClass={ColorClass.Secondary}
      >{`Expires in ${diffInMinutes} ${pluralize(
        "minute",
        diffInMinutes
      )}`}</Body2>
    );
  }

  return <Body2 colorClass={ColorClass.Red}>Expired</Body2>;
}

function Description({
  transactionData,
}: {
  transactionData: NftOfferGeneric_NftTransactionExpress$data;
}) {
  const profileLinkFrom = (
    <ProfileLink
      username={transactionData.From?.username}
      photoSrc={transactionData.From?.ProfilePhoto?.photoUrl}
      userAddress={transactionData.fromAddress}
    />
  );

  return (
    <div className={styles.description}>
      <TxLink txid={transactionData.txid}>
        <PriceWithSymbol
          fontClass={FontClass.Body1}
          price={transactionData.price}
        />
      </TxLink>
      <Body1 colorClass={ColorClass.Primary}>from</Body1>
      {profileLinkFrom}
    </div>
  );
}

const offerFragment = graphql`
  fragment NftOfferGeneric_NftTransactionExpress on NftTransactionExpress {
    comment
    fromAddress
    price {
      ...PriceWithSymbol_Price
    }
    timeCreated
    txid

    From {
      username

      ProfilePhoto {
        photoUrl
      }
    }
  }
`;

type Props = {
  actionButton: JSX.Element;
  className?: string;
  expirationDate: dayjs.Dayjs;
  isValid: boolean;
  nftAsset?: JSX.Element;
  showComment?: boolean;
  transaction: NftOfferGeneric_NftTransactionExpress$key;
};

export default function NftOfferGeneric({
  actionButton,
  className,
  isValid,
  expirationDate,
  nftAsset,
  showComment = true,
  transaction,
}: Props): Maybe<JSX.Element> {
  const { isMobileBreakpoint } = useBreakpoint();
  const transactionData = useFragment(offerFragment, transaction);
  const isExpired = dayjs(expirationDate).isBefore(dayjs());
  const descriptionAndTime = (
    <div className={styles.descriptionAndTime}>
      <Description transactionData={transactionData} />
      <div className={styles.timeAndExpiration}>
        <Body2 colorClass={ColorClass.Secondary}>
          {formatTransactionTimestamp(transactionData.timeCreated)}
        </Body2>
        {!isMobileBreakpoint && (
          <Body2 colorClass={ColorClass.Secondary}>•</Body2>
        )}
        <ExpirationDate date={expirationDate} />
        {!isValid && !isExpired && (
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.Error}
            fontClass={FontClass.Body2}
            href="https://help.formfunction.xyz/en/articles/6185509-how-offers-work"
            type="link_external"
          >
            (offer inactive)
          </TextButton>
        )}
      </div>
    </div>
  );

  // We move the action button down in the mobile view.
  const actionButtonDesktop = !isMobileBreakpoint ? actionButton : null;
  const actionButtonMobile = isMobileBreakpoint ? (
    <div className={styles.mobileActionButton}>{actionButton}</div>
  ) : null;

  return (
    <div className={joinClasses(styles.container, className)}>
      <div className={styles.transactionMain}>
        <div className={styles.assetAndDescription}>
          {nftAsset}
          {descriptionAndTime}
        </div>
        {actionButtonDesktop}
      </div>
      {showComment && (
        <NftTransactionComment comment={transactionData.comment} />
      )}
      {actionButtonMobile}
    </div>
  );
}
