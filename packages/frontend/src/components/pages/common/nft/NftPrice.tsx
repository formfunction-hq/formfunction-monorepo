import graphql from "babel-plugin-relay/macro";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import { NftPrice_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftPrice_MetadataAccount.graphql";
import Price from "components/text/Price";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import styles from "css/pages/common/nft/NftPrice.module.css";
import dayjs from "utils/dates/dayjsex";
import AuctionCountdown from "components/auction/AuctionCountdown";
import useSolanaContext from "hooks/useSolanaContext";
import useNftPageContext from "hooks/useNftPageContext";
import InfoIcon from "components/icons/InfoIcon";
import ColorValue from "types/enums/ColorValue";
import Body2 from "components/text/Body2";
import formatScheduledAuctionTime from "formfn-shared/dist/utils/dates/formatScheduledAuctionTime";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useNftKind from "hooks/useNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import PriceWithSymbol from "components/price/PriceWithSymbol";
import Body1 from "components/text/Body1";

const fragment = graphql`
  fragment NftPrice_MetadataAccount on MetadataAccount {
    nft {
      auctionEndTime
      auctionWinnerId
      maxSupply
      numberOfStandardEditionsMinted
      priceV2 {
        ...PriceWithSymbol_Price
      }
      priceLastSoldV2 {
        ...PriceWithSymbol_Price
      }
      scheduledAuctionTime
      status
    }

    numberOfBidsForCurrentAuction

    ...useNftKind_MetadataAccount
  }
`;

type Props = {
  metadataAccount: NftPrice_MetadataAccount$key;
};

export default function NftPrice({
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { anchorWallet } = useSolanaContext();
  const nftKind = useNftKind(metadataAccountData);
  const {
    auctionEndTime,
    auctionWinnerId,
    maxSupply,
    numberOfStandardEditionsMinted,
    status,
    priceV2,
    priceLastSoldV2,
  } = metadataAccountData.nft;
  const isAuctionWinner =
    anchorWallet?.publicKey != null &&
    arePublicKeysEqual(anchorWallet.publicKey, auctionWinnerId ?? "");
  const { isAuctionEnded } = useNftPageContext();
  const receivedBids =
    (metadataAccountData.numberOfBidsForCurrentAuction ?? 0) > 0;

  switch (nftKind) {
    case NftKind.PnftMasterEdition:
      return null;
    case NftKind.MasterEditionWithNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.Generative:
    case NftKind.OneOfOne:
    case NftKind.PnftStandardEdition:
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply:
      break;
    default:
      assertUnreachable(nftKind);
  }

  if (
    priceV2 == null &&
    priceLastSoldV2 == null &&
    !["Burned", "AirdropCompleted", "AirdropInProgress"].includes(status)
  ) {
    switch (nftKind) {
      case NftKind.MasterEditionWithNonzeroSupply:
      case NftKind.MasterEditionWithUnlimitedSupply:
        return null;
      case NftKind.Generative:
      case NftKind.OneOfOne:
      case NftKind.PnftStandardEdition:
      case NftKind.StandardEditionPrintNonzeroSupply:
      case NftKind.StandardEditionPrintUnlimitedSupply:
        return (
          <NftLabelAndContent label="Reserve Price">
            <Price colorClass={ColorClass.Primary}>---</Price>
          </NftLabelAndContent>
        );
      default:
        assertUnreachable(nftKind);
    }
  }

  const priceElem = (priceV2 != null || priceLastSoldV2 != null) && (
    <PriceWithSymbol price={(priceV2 ?? priceLastSoldV2)!} />
  );

  switch (status) {
    case "Auction":
      if (isAuctionEnded) {
        if (!receivedBids) {
          return (
            <NftLabelAndContent label="Listed For">
              {priceElem}
            </NftLabelAndContent>
          );
        }

        return (
          <div className={styles.withDescriptionContainer}>
            <NftLabelAndContent label="Last Sold For">
              {priceElem}
            </NftLabelAndContent>
            {isAuctionWinner && (
              <div className={styles.withInfoIconContainer}>
                <InfoIcon colorValue={ColorValue.Primary} size={24} />
                <Body2 colorClass={ColorClass.Primary}>
                  You will be notified when the owner settles the auction and
                  the NFT is transferred.
                </Body2>
              </div>
            )}
          </div>
        );
      }

      return (
        <div className={styles.flexContainer}>
          <NftLabelAndContent
            label={receivedBids ? "Current Bid" : "Reserve Price"}
          >
            {priceElem}
          </NftLabelAndContent>
          <NftLabelAndContent label="Ends In">
            <AuctionCountdown
              shouldTriggerUpdate
              auctionEndTime={dayjs(auctionEndTime)}
            />
          </NftLabelAndContent>
        </div>
      );
    case "AirdropCompleted":
      return (
        <NftLabelAndContent label="Airdrop">
          <Body1 colorClass={ColorClass.Primary}>
            The airdrop has been completed.
          </Body1>
        </NftLabelAndContent>
      );
    case "AirdropInProgress":
      return (
        <NftLabelAndContent label="Airdrop">
          <Body1 colorClass={ColorClass.Primary}>
            This airdrop is in progress.
          </Body1>
        </NftLabelAndContent>
      );
    case "Burned":
      return (
        <NftLabelAndContent label="Burned 🔥">
          <Body1 colorClass={ColorClass.Primary}>This NFT was burned.</Body1>
        </NftLabelAndContent>
      );
    case "Listed":
      return (
        <NftLabelAndContent label="Listed For">{priceElem}</NftLabelAndContent>
      );
    case "ListedEditions":
      return (
        <div className={styles.flexContainer}>
          <NftLabelAndContent label="Buy Now">{priceElem}</NftLabelAndContent>
          <NftLabelAndContent label="Editions Sold">
            <Price colorClass={ColorClass.Primary}>
              {maxSupply == null
                ? numberOfStandardEditionsMinted
                : `${numberOfStandardEditionsMinted}/${maxSupply}`}
            </Price>
          </NftLabelAndContent>
        </div>
      );
    case "ListedInstantSale":
      return (
        <NftLabelAndContent label="Buy now">{priceElem}</NftLabelAndContent>
      );
    case "ListingScheduled":
      return (
        <div className={styles.withDescriptionContainer}>
          <NftLabelAndContent label="Reserve Price">
            {priceElem}
          </NftLabelAndContent>
          <div className={styles.withInfoIconContainer}>
            <InfoIcon colorValue={ColorValue.Primary} size={24} />
            <Body2 colorClass={ColorClass.Primary}>
              This auction is scheduled to start on{" "}
              {formatScheduledAuctionTime(
                metadataAccountData.nft.scheduledAuctionTime!,
                "long"
              )}
              . You won&apos;t be able to place bids until this time.
            </Body2>
          </div>
        </div>
      );
    case "Owned":
      return (
        <NftLabelAndContent label="Last Sold For">
          {priceElem}
        </NftLabelAndContent>
      );
    case "OwnedStoppedMintingForEditions":
    case "SoldOutEditions":
      return (
        <NftLabelAndContent label="Editions Sold">
          <Price colorClass={ColorClass.Primary}>
            {numberOfStandardEditionsMinted}/
            {/* Null coalescing is to support NFTs with unlimited supply */}
            {maxSupply ?? numberOfStandardEditionsMinted}
          </Price>
        </NftLabelAndContent>
      );
    case RELAY_FUTURE_ADDED_VALUE:
      return (
        <NftLabelAndContent label="Reserve Price">
          <Price colorClass={ColorClass.Primary}>---</Price>
        </NftLabelAndContent>
      );
    default:
      return assertUnreachable(status);
  }
}
