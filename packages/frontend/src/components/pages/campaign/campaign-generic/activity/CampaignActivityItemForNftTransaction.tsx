import styles from "css/pages/campaign/campaign-generic/activity/CampaignActivityItem.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import formatUsername from "utils/formatUsername";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import Body2 from "components/text/Body2";
import formatTransactionTimestamp from "utils/dates/formatTransactionTimestamp";
import TextButton from "components/buttons/TextButton";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import { CampaignActivityItemForNftTransaction_NftTransactionExpress$key } from "components/pages/campaign/campaign-generic/activity/__generated__/CampaignActivityItemForNftTransaction_NftTransactionExpress.graphql";

const nftTransactionFragment = graphql`
  fragment CampaignActivityItemForNftTransaction_NftTransactionExpress on NftTransactionExpress {
    fromAddress
    toAddress
    nftInfo {
      assetHeight
      assetWidth
      edition
      maxSupplyOfMasterEdition
      mint
      name
    }
    timeCreated
    toAddress
    type

    From {
      username
    }

    To {
      username
    }
  }
`;

const ActivityRow = ({
  children,
  timeCreated,
}: {
  children: any;
  timeCreated: string;
}) => (
  <div className={styles.container}>
    <Body1 colorClass={ColorClass.Primary}>{children}</Body1>
    <Body2 colorClass={ColorClass.Secondary}>
      {formatTransactionTimestamp(timeCreated)}
    </Body2>
  </div>
);

type Props = {
  nftTransaction: CampaignActivityItemForNftTransaction_NftTransactionExpress$key;
};

export default function CampaignActivityItemForNftTransaction({
  nftTransaction,
}: Props) {
  const nftTransactionData = useFragment(
    nftTransactionFragment,
    nftTransaction
  );

  const {
    assetHeight,
    assetWidth,
    edition,
    maxSupplyOfMasterEdition,
    mint,
    name,
  } = nftTransactionData.nftInfo;

  const fromUsernameRaw =
    nftTransactionData.From?.username ?? nftTransactionData.fromAddress;
  const fromUsername = `@${formatUsername(fromUsernameRaw)}`;
  const toUsernameRaw =
    nftTransactionData.To?.username ?? nftTransactionData.toAddress;
  const toUsername = `@${formatUsername(toUsernameRaw)}`;

  const fromElem = (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.Primary}
      fontClass={FontClass.Body1Medium}
      display="inline"
      href={getUserProfileLinkRelative(fromUsernameRaw)}
      type="link_internal"
    >
      {fromUsername}
    </TextButton>
  );
  const toElem = (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.Primary}
      fontClass={FontClass.Body1Medium}
      display="inline"
      href={getUserProfileLinkRelative(toUsernameRaw)}
      type="link_internal"
    >
      {toUsername}
    </TextButton>
  );
  const nameElem = (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.Primary}
      fontClass={FontClass.Body1}
      display="inline"
      href={getNftLinkRelative(fromUsernameRaw, mint, assetWidth, assetHeight)}
      type="link_internal"
    >
      {name}
    </TextButton>
  );

  switch (nftTransactionData.type) {
    case "AuctionWon":
      return (
        <ActivityRow timeCreated={nftTransactionData.timeCreated}>
          {toElem} won the auction for {nameElem}
        </ActivityRow>
      );
    case "Bid":
      return (
        <ActivityRow timeCreated={nftTransactionData.timeCreated}>
          {fromElem} bid on {nameElem}
        </ActivityRow>
      );
    case "Burned":
    case "ChangePriceForEditions":
    case "ClaimedPnft":
    case "HolaplexRedeemBid":
    case "HolaplexRedeemFullRightsTransferBid":
    case "HolaplexRedeemPrintingV2Bid":
    case "Imported":
    case "Listed":
    case "ListedEditions":
    case "ListedInstantSale":
    case "ListingCancelled":
    case "Minted":
    case "Offer":
    case "OfferCancelled":
    case "Refunded":
    case "Sold":
    case "SoldAcceptedOffer":
    case "SoldEditionPrimary":
      return (
        <ActivityRow timeCreated={nftTransactionData.timeCreated}>
          {edition != null && maxSupplyOfMasterEdition != null ? (
            <>
              {toElem} bought edition #{edition} / {maxSupplyOfMasterEdition} of{" "}
              {nameElem}
            </>
          ) : (
            <>
              {toElem} bought {nameElem}
            </>
          )}
        </ActivityRow>
      );
    case "SoldInstantSale":
      return (
        <ActivityRow timeCreated={nftTransactionData.timeCreated}>
          {toElem} bought {nameElem} as an instant sale
        </ActivityRow>
      );
    case "SoldGenerativeMint":
      return (
        <ActivityRow timeCreated={nftTransactionData.timeCreated}>
          {toElem} bought {nameElem}
        </ActivityRow>
      );
    case "StoppedMintingForEditions":
    case "Transferred":
    case RELAY_FUTURE_ADDED_VALUE:
      return <div>{nftTransactionData.type}</div>;
    default:
      return assertUnreachable(nftTransactionData.type);
  }
}
