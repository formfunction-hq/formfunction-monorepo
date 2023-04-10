import styles from "css/pages/common/nft/NftTransaction.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import Body2 from "components/text/Body2";
import formatTransactionTimestamp from "utils/dates/formatTransactionTimestamp";
import useExchangeRatesContext from "hooks/useExchangeRatesContext";
import {
  NftTransactionSourceExpress_enum,
  NftTransaction_NftTransactionExpress$data,
  NftTransaction_NftTransactionExpress$key,
} from "components/pages/common/nft/__generated__/NftTransaction_NftTransactionExpress.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import GlobalClass from "types/enums/GlobalClass";
import ExchangeArtIcon from "components/icons/ExchangeArtIcon";
import ProfileLink from "components/pages/common/nft/ProfileLink";
import TxLink from "components/pages/common/nft/TxLink";
import NftTransactionComment from "components/pages/common/nft/NftTransactionComment";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import {
  NftTransaction_MetadataAccount$data,
  NftTransaction_MetadataAccount$key,
} from "components/pages/common/nft/__generated__/NftTransaction_MetadataAccount.graphql";
import useNftKindNullable from "hooks/useNftKindNullable";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import SOLD_TRANSACTION_TYPES from "constants/transactions/SoldTransactionTypes";
import PriceWithSymbol from "components/price/PriceWithSymbol";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import { Tooltip } from "antd";
import ColorValue from "types/enums/ColorValue";
import FlexBox from "components/layout/FlexBox";

const TX_DESCRIPTION: { [key: string]: string } = {
  Airdropped: "Airdropped by",
  Bid: "Bid by",
  Burned: "Burned by",
  ChangePriceForEditions: "Pricing changed by",
  ClaimedPnft: "Claimed by",
  Imported: "Imported by",
  Listed: "Listed by",
  ListedInstantSale: "Listed as an instant sale by",
  ListingCancelled: "Unlisted by",
  Minted: "Minted by",
  SoldGenerativeMint: "Minted by",
  StoppedMintingForEditions: "Minting was stopped by",
};

function getUserForTx(
  nftTransactionData: NftTransaction_NftTransactionExpress$data
) {
  const { type: txType } = nftTransactionData;

  switch (txType) {
    case "AuctionWon":
    case "ClaimedPnft":
    case "SoldGenerativeMint":
      return {
        user: nftTransactionData.To,
        userAddress: nftTransactionData.toAddress,
      };
    case "Bid":
    case "Burned":
    case "ChangePriceForEditions":
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
    case "SoldInstantSale":
    case "StoppedMintingForEditions":
    case "Transferred":
    case RELAY_FUTURE_ADDED_VALUE:
      return {
        user: nftTransactionData.From,
        userAddress: nftTransactionData.fromAddress,
      };
    default:
      return assertUnreachable(txType);
  }
}
function TxSecondarySale({
  nftTransactionData,
}: {
  nftTransactionData: NftTransaction_NftTransactionExpress$data;
}) {
  const isSecondarySale =
    nftTransactionData.auctionCount > 0 &&
    SOLD_TRANSACTION_TYPES.includes(nftTransactionData.type);

  return isSecondarySale ? <> • Secondary Sale</> : null;
}

function TxSource({ source }: { source: NftTransactionSourceExpress_enum }) {
  switch (source) {
    case "Holaplex":
      return <> • 👋 Holaplex</>;
    case "ExchangeArt":
      return (
        <>
          {" "}
          •&nbsp;
          <ExchangeArtIcon />
        </>
      );
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(source);
  }
}

function DescriptionContainer({ children }: { children: any }) {
  return (
    <Body1 className={styles.description} colorClass={ColorClass.Primary}>
      {children}
    </Body1>
  );
}

// TODO[@][fragments]: should refactor to use fragments
function Description({
  metadataAccountData,
  nftTransactionData,
}: {
  metadataAccountData: Maybe<NftTransaction_MetadataAccount$data>;
  nftTransactionData: NftTransaction_NftTransactionExpress$data;
}) {
  const { user, userAddress } = getUserForTx(nftTransactionData);
  const { type: txType } = nftTransactionData;
  const nftKind = useNftKindNullable(metadataAccountData);
  const showEditionNumber =
    nftKind != null &&
    [
      NftKind.MasterEditionWithNonzeroSupply,
      NftKind.MasterEditionWithUnlimitedSupply,
    ].includes(nftKind);
  const editionNumber = nftTransactionData.nftInfo.edition;
  const profileLinkFrom = (
    <ProfileLink
      photoSrc={nftTransactionData.From?.ProfilePhoto?.photoUrl}
      username={nftTransactionData.From?.username}
      userAddress={nftTransactionData.fromAddress}
    />
  );

  const profileLinkTo = (
    <ProfileLink
      photoSrc={nftTransactionData.To?.ProfilePhoto?.photoUrl}
      username={nftTransactionData.To?.username}
      userAddress={nftTransactionData.toAddress}
    />
  );

  switch (txType) {
    case "AuctionWon": {
      const txLink = (
        <TxLink txid={nftTransactionData.txid}>
          <div className={GlobalClass.GradientText}>Auction won by</div>
        </TxLink>
      );

      return (
        <DescriptionContainer>
          {txLink}
          <ProfileLink
            isGradient
            photoSrc={nftTransactionData.To?.ProfilePhoto?.photoUrl}
            username={nftTransactionData.To?.username}
            userAddress={nftTransactionData.toAddress}
          />
        </DescriptionContainer>
      );
    }
    case "ListedEditions": {
      const txLink = (
        <TxLink txid={nftTransactionData.txid}>
          {nftKind === NftKind.MasterEditionWithUnlimitedSupply
            ? "Open editions listed by"
            : `${nftTransactionData.nftInfo.maxSupply} editions listed by`}
        </TxLink>
      );

      return (
        <DescriptionContainer>
          {txLink}
          {profileLinkFrom}
        </DescriptionContainer>
      );
    }
    case "SoldAcceptedOffer": {
      const txLink = (
        <TxLink txid={nftTransactionData.txid}>
          &apos;s offer{showEditionNumber ? ` for #${editionNumber}` : ""}{" "}
          accepted by
        </TxLink>
      );

      return (
        <DescriptionContainer>
          <div className={styles.descriptionInline}>
            {profileLinkTo}
            {txLink}
          </div>
          {profileLinkFrom}
        </DescriptionContainer>
      );
    }
    case "SoldEditionPrimary": {
      const txLink = showEditionNumber ? (
        <TxLink txid={nftTransactionData.txid}>
          #{editionNumber} bought by
        </TxLink>
      ) : (
        <TxLink txid={nftTransactionData.txid}>
          <Body1 colorClass={ColorClass.Primary}>Bought by</Body1>
        </TxLink>
      );

      return (
        <DescriptionContainer>
          {txLink}
          {profileLinkTo}
        </DescriptionContainer>
      );
    }
    case "SoldInstantSale": {
      const txLink = showEditionNumber ? (
        <TxLink txid={nftTransactionData.txid}>
          #{editionNumber} bought as instant sale by
        </TxLink>
      ) : (
        <TxLink txid={nftTransactionData.txid}>Bought by</TxLink>
      );

      return (
        <DescriptionContainer>
          {txLink}
          {profileLinkTo}
        </DescriptionContainer>
      );
    }
    case "Sold": {
      if (!showEditionNumber) {
        const txLink = <TxLink txid={nftTransactionData.txid}>Sold by</TxLink>;

        return (
          <DescriptionContainer>
            {txLink}
            {profileLinkFrom}
            to
            {profileLinkTo}
          </DescriptionContainer>
        );
      }
      const txLink = (
        <TxLink txid={nftTransactionData.txid}>
          #{editionNumber} bought via auction by
        </TxLink>
      );

      return (
        <DescriptionContainer>
          {txLink}
          {profileLinkTo}
        </DescriptionContainer>
      );
    }
    case "Transferred": {
      const txLink = (
        <TxLink txid={nftTransactionData.txid}>Transferred by</TxLink>
      );

      return (
        <DescriptionContainer>
          {txLink}
          {profileLinkFrom}
          to
          {profileLinkTo}
        </DescriptionContainer>
      );
    }
    case "Bid":
    case "Burned":
    case "ChangePriceForEditions":
    case "ClaimedPnft":
    case "Imported":
    case "Listed":
    case "ListedInstantSale":
    case "ListingCancelled":
    case "Refunded":
    case "StoppedMintingForEditions":
    case "SoldGenerativeMint":
    case RELAY_FUTURE_ADDED_VALUE: {
      const txLink = (
        <TxLink txid={nftTransactionData.txid}>
          {TX_DESCRIPTION[nftTransactionData.type]}
        </TxLink>
      );

      return (
        <DescriptionContainer>
          {txLink}
          <ProfileLink
            photoSrc={user?.ProfilePhoto?.photoUrl}
            username={user?.username}
            userAddress={userAddress}
          />
        </DescriptionContainer>
      );
    }
    case "Minted": {
      const description =
        nftTransactionData.To?.username !== nftTransactionData.From?.username
          ? TX_DESCRIPTION.Airdropped
          : TX_DESCRIPTION[nftTransactionData.type];
      const txLink = (
        <TxLink txid={nftTransactionData.txid}>{description}</TxLink>
      );

      return (
        <DescriptionContainer>
          {txLink}
          <ProfileLink
            photoSrc={user?.ProfilePhoto?.photoUrl}
            username={user?.username}
            userAddress={userAddress}
          />
        </DescriptionContainer>
      );
    }
    case "HolaplexRedeemBid":
    case "HolaplexRedeemFullRightsTransferBid":
    case "HolaplexRedeemPrintingV2Bid":
    case "Offer":
    case "OfferCancelled":
      throw new Error("Invalid tx type for display");
    default:
      return assertUnreachable(txType);
  }
}

function PriceSection({
  nftTransactionData,
}: {
  nftTransactionData: NftTransaction_NftTransactionExpress$data;
}) {
  const { price } = nftTransactionData;
  const { priceToUsd } = useExchangeRatesContext();
  const formattedPrice = useFormattedNftPrice(price);
  if (price == null) {
    return null;
  }
  const usdPrice = priceToUsd(Number(formattedPrice), price.currencyInfo.name);

  const content = (
    <div className={styles.price}>
      <PriceWithSymbol
        className={
          nftTransactionData.type === "AuctionWon"
            ? GlobalClass.GradientText
            : ColorClass.Primary
        }
        price={price}
      />
      {usdPrice != null && (
        <Body2 colorClass={ColorClass.Secondary}>${usdPrice} USD</Body2>
      )}
    </div>
  );

  if (nftTransactionData.usdPrice == null) {
    return content;
  }

  return (
    <Tooltip
      color={ColorValue.WebsiteBackground}
      title={
        <FlexBox
          alignItems="center"
          className={styles.priceTooltip}
          flexDirection="column"
          gap={4}
        >
          <Body1 colorClass={ColorClass.Primary} textAlign="center">
            Day-of price: $
            {nftTransactionData.usdPrice.toLocaleString("en-US", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Body1>
          <Body2 colorClass={ColorClass.Secondary} textAlign="center">
            Based on the price at the time of the transaction.
          </Body2>
        </FlexBox>
      }
    >
      {content}
    </Tooltip>
  );
}

const fragment = graphql`
  fragment NftTransaction_NftTransactionExpress on NftTransactionExpress {
    auctionCount
    comment
    fromAddress
    nftInfo {
      edition
      maxSupply
    }
    price {
      ...PriceWithSymbol_Price
      ...useFormattedNftPrice_Price
      currencyInfo {
        name
      }
    }
    source
    timeCreated
    toAddress
    txid
    type
    usdPrice
    From {
      username
      ProfilePhoto {
        photoUrl
      }
    }
    To {
      username
      ProfilePhoto {
        photoUrl
      }
    }
  }
`;

const nftFragment = graphql`
  fragment NftTransaction_MetadataAccount on MetadataAccount {
    ...useNftKindNullable_MetadataAccount
  }
`;

type Props = {
  // The NFT for which the tx is being rendered
  metadataAccount?: NftTransaction_MetadataAccount$key;
  nftTransaction: NftTransaction_NftTransactionExpress$key;
};

export default function NftTransaction({
  metadataAccount,
  nftTransaction,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(nftFragment, metadataAccount ?? null);
  const nftTransactionData = useFragment(fragment, nftTransaction);

  // We don't show transfers in our UI
  if (nftTransactionData.type === "Transferred") {
    return null;
  }

  const source =
    nftTransactionData.source == null ? null : (
      <TxSource source={nftTransactionData.source} />
    );

  return (
    <div className={styles.container}>
      <div className={styles.transactionMain}>
        <div className={styles.left}>
          <Description
            metadataAccountData={metadataAccountData}
            nftTransactionData={nftTransactionData}
          />
          <Body2
            className={styles.timeAndSource}
            colorClass={ColorClass.Secondary}
          >
            {formatTransactionTimestamp(nftTransactionData.timeCreated)}
            {source}
            <TxSecondarySale nftTransactionData={nftTransactionData} />
          </Body2>
        </div>
        <PriceSection nftTransactionData={nftTransactionData} />
      </div>
      <NftTransactionComment comment={nftTransactionData.comment} />
    </div>
  );
}
