import graphql from "babel-plugin-relay/macro";
import AuctionCountdown from "components/auction/AuctionCountdown";
import { NftOtherInfo_MetadataAccount$key } from "components/auction/__generated__/NftOtherInfo_MetadataAccount.graphql";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import NavLink from "components/text/NavLink";
import styles from "css/auction/NftOtherInfo.module.css";
import useNftPageContext from "hooks/useNftPageContext";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "utils/dates/dayjsex";
import AuctionIcon from "components/icons/AuctionIcon";
import ColorValue from "types/enums/ColorValue";
import formatScheduledAuctionTime from "formfn-shared/dist/utils/dates/formatScheduledAuctionTime";
import joinClasses from "utils/joinClasses";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import PriceWithSymbol from "components/price/PriceWithSymbol";
import NftOtherInfoWithSeparator from "components/auction/NftOtherInfoWithSeparator";

const WithSeparator = NftOtherInfoWithSeparator;

function FlexRow({ children }: { children: any }): JSX.Element {
  return <div className={styles.flexRow}>{children}</div>;
}

const fragment = graphql`
  fragment NftOtherInfo_MetadataAccount on MetadataAccount {
    nft {
      auctionEndTime
      isOffPlatform
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
  }
`;

type Props = {
  metadataAccount: NftOtherInfo_MetadataAccount$key;
};

export default function NftOtherInfo({
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { nft } = metadataAccountData;
  const { isAuctionEnded } = useNftPageContext();
  const receivedBids =
    (metadataAccountData.numberOfBidsForCurrentAuction ?? 0) > 0;

  const { priceV2, priceLastSoldV2, status } = nft;
  const priceToUse = priceV2 ?? priceLastSoldV2;

  const threeDashes = <NavLink colorClass={ColorClass.Primary}>---</NavLink>;

  if (nft.isOffPlatform) {
    return (
      <WithSeparator>
        <NftLabelAndContent label="Off Platform">
          {threeDashes}
        </NftLabelAndContent>
      </WithSeparator>
    );
  }

  const hasBeenSold = (
    <div className={styles.lightPurpleGradient}>
      <NftLabelAndContent
        labelColorClass={ColorClass.DarkPurple}
        label="Last Sold For"
      >
        <PriceWithSymbol
          colorClass={ColorClass.DarkPurple}
          fontClass={FontClass.NavLink}
          price={priceToUse}
        />
      </NftLabelAndContent>
    </div>
  );

  const reservePrice = (
    <WithSeparator>
      <NftLabelAndContent
        label="Reserve Price"
        icon={<AuctionIcon colorValue={ColorValue.Secondary} size={20} />}
      >
        <PriceWithSymbol fontClass={FontClass.NavLink} price={priceToUse} />
      </NftLabelAndContent>
    </WithSeparator>
  );

  switch (status) {
    case "Auction":
      if (isAuctionEnded) {
        return receivedBids ? hasBeenSold : reservePrice;
      }

      return (
        <div
          className={joinClasses(
            styles.auction,
            receivedBids ? styles.auctionGradient : styles.auctionSolid
          )}
        >
          <FlexRow>
            <NftLabelAndContent
              label={receivedBids ? "Current Bid" : "Reserve Price"}
              labelColorClass={ColorClass.White}
            >
              <PriceWithSymbol
                colorClass={ColorClass.White}
                fontClass={FontClass.NavLink}
                price={priceToUse}
              />
            </NftLabelAndContent>
            <NftLabelAndContent
              label="Ends In"
              labelColorClass={ColorClass.White}
            >
              <div className={styles.auctionCountdown}>
                <AuctionCountdown
                  shouldTriggerUpdate
                  colorClass={ColorClass.White}
                  auctionEndTime={dayjs(nft.auctionEndTime)}
                  fontClass={FontClass.NavLink}
                />
              </div>
            </NftLabelAndContent>
          </FlexRow>
        </div>
      );
    case "Listed":
      return reservePrice;
    case "ListedEditions":
      return (
        <WithSeparator>
          <FlexRow>
            <NftLabelAndContent label="Buy now">
              <PriceWithSymbol
                fontClass={FontClass.NavLink}
                price={priceToUse}
              />
            </NftLabelAndContent>
            <NftLabelAndContent label="Editions Sold">
              <NavLink colorClass={ColorClass.Primary}>
                {nft.maxSupply == null
                  ? nft.numberOfStandardEditionsMinted
                  : `${nft.numberOfStandardEditionsMinted}/${nft.maxSupply}`}
              </NavLink>
            </NftLabelAndContent>
          </FlexRow>
        </WithSeparator>
      );
    case "ListedInstantSale":
      return (
        <WithSeparator>
          <NftLabelAndContent label="Buy now">
            <PriceWithSymbol fontClass={FontClass.NavLink} price={priceToUse} />
          </NftLabelAndContent>
        </WithSeparator>
      );
    case "ListingScheduled":
      return (
        <WithSeparator>
          <NftLabelAndContent
            label={`Scheduled • ${formatScheduledAuctionTime(
              nft.scheduledAuctionTime!,
              "short"
            )}`}
          >
            <PriceWithSymbol fontClass={FontClass.NavLink} price={priceToUse} />
          </NftLabelAndContent>
        </WithSeparator>
      );
    case "AirdropCompleted":
      return (
        <WithSeparator>
          <NftLabelAndContent label="Airdropped">
            {threeDashes}
          </NftLabelAndContent>
        </WithSeparator>
      );
    case "AirdropInProgress":
      return (
        <WithSeparator>
          <NftLabelAndContent label="Airdrop in progress">
            {threeDashes}
          </NftLabelAndContent>
        </WithSeparator>
      );
    case "Owned":
      if (priceV2 == null && priceLastSoldV2 == null) {
        // Has not been sold
        return (
          <WithSeparator>
            <NftLabelAndContent label="Not Listed">
              {threeDashes}
            </NftLabelAndContent>
          </WithSeparator>
        );
      }

      return hasBeenSold;
    case "OwnedStoppedMintingForEditions":
    case "SoldOutEditions":
      return (
        <div className={styles.lightPurpleGradient}>
          <NftLabelAndContent
            labelColorClass={ColorClass.DarkPurple}
            label="Sold Out"
          >
            <NavLink colorClass={ColorClass.DarkPurple}>
              {/* Null coalescing is to support NFTs with unlimited supply */}
              {nft.maxSupply ?? nft.numberOfStandardEditionsMinted}/
              {nft.maxSupply ?? nft.numberOfStandardEditionsMinted}
            </NavLink>
          </NftLabelAndContent>
        </div>
      );
    case "Burned":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(status);
  }
}
