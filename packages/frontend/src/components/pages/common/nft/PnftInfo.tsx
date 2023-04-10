import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/pages/common/nft/PnftInfo.module.css";
import ColorClass from "types/enums/ColorClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ClaimPnftModal from "components/modal/ClaimPnftModal";
import { useState } from "react";
import Body2 from "components/text/Body2";
import ButtonTheme from "types/enums/ButtonTheme";
import ButtonWithText from "components/buttons/ButtonWithText";
import FontClass from "types/enums/FontClass";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CheckmarkGradientIcon from "components/icons/CheckmarkGradientIcon";
import formatTransactionTimestamp from "utils/dates/formatTransactionTimestamp";
import { PnftInfo_PnftInfoResponse$key } from "components/pages/common/nft/__generated__/PnftInfo_PnftInfoResponse.graphql";
import { PnftInfo_MetadataAccount$key } from "components/pages/common/nft/__generated__/PnftInfo_MetadataAccount.graphql";
import useFlagsTyped from "hooks/useFlagsTyped";
import { Duration } from "dayjs/plugin/duration";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import isPnftDropExpired from "formfn-shared/dist/utils/isPnftDropExpired";
import NftAssetForMetadataAccount from "components/images/NftAssetForMetadataAccount";
import NftAssetSize from "types/enums/NftAssetSize";
import {
  useNftPageClaimsQuery,
  useNftPageClaimsQuery$data,
} from "hooks/nft-page/__generated__/useNftPageClaimsQuery.graphql";
import { claimsQuery } from "hooks/nft-page/useNftPageClaims";
import useBreakpoint from "hooks/useBreakpoint";
import NftGenericSupplementaryItem from "components/pages/common/nft/NftGenericSupplementaryItem";
import NftGenericSupplementaryItemType from "types/NftGenericSupplementaryItemType";
import useNftLinkForMetadataAccount from "hooks/useNftLinkForMetadataAccount";

const nftFragment = graphql`
  fragment PnftInfo_MetadataAccount on MetadataAccount {
    primarySaleHappened

    nft {
      pnftIdForAuction
    }

    ...ClaimPnftModal_AuctionNft_MetadataAccount
  }
`;

const pnftFragment = graphql`
  fragment PnftInfo_PnftInfoResponse on MetadataAccount {
    data {
      name
    }

    ...useNftLinkForMetadataAccount_MetadataAccount
    ...ClaimPnftModal_MetadataAccount
    ...NftAssetForMetadataAccount_MetadataAccount
  }
`;

enum ClaimState {
  Available = "Available",
  Claimed = "Claimed",
  Default = "Default",
  Expired = "Expired",
}

type Claim = useNftPageClaimsQuery$data["Claim_by_pk"];

function getClaimState(claim: Maybe<Claim>, dropDuration: Duration) {
  if (claim != null) {
    if (claim.claimTransactionId != null) {
      return ClaimState.Claimed;
    }

    if (claim.proof != null) {
      const isDropExpired = isPnftDropExpired(claim.timeCreated, dropDuration);
      return isDropExpired ? ClaimState.Expired : ClaimState.Available;
    }
  }

  return ClaimState.Default;
}

function shouldRenderPnftInfoType(
  componentType: NftGenericSupplementaryItemType,
  primarySaleHappened: boolean,
  isClaimAvailable: boolean
) {
  switch (componentType) {
    case "standard":
      // Standard view is applicable before the primary sale has happened OR
      // if the user has a valid claim available.
      return !primarySaleHappened || isClaimAvailable;
    case "subtle":
      // Subtle view is applicable after the primary sale has happened AND if
      // the user does not have a claim available.
      return primarySaleHappened && !isClaimAvailable;
    default:
      return assertUnreachable(componentType);
  }
}

function getClaimAction({
  claimState,
  isMobileBreakpoint,
  setIsClaimModalShown,
}: {
  claimState: ClaimState;
  isMobileBreakpoint: boolean;
  setIsClaimModalShown: (state: boolean) => void;
}) {
  switch (claimState) {
    case ClaimState.Default:
    case ClaimState.Claimed:
    case ClaimState.Expired: {
      return null;
    }
    case ClaimState.Available:
      return (
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.Body1Medium}
          onClick={() => setIsClaimModalShown(true)}
        >
          {isMobileBreakpoint ? "Claim NFT" : "Claim participation NFT"}
        </ButtonWithText>
      );
    default:
      return assertUnreachable(claimState);
  }
}

function getClaimDescriptionText({
  claim,
  claimState,
  componentType,
}: {
  claim: Maybe<Claim>;
  claimState: ClaimState;
  componentType: NftGenericSupplementaryItemType;
}) {
  switch (claimState) {
    case ClaimState.Available:
      return (
        <Body2 colorClass={ColorClass.Secondary}>
          You can claim this participation NFT now.
        </Body2>
      );
    case ClaimState.Default:
      return componentType === "standard" ? (
        <Body2 colorClass={ColorClass.Secondary}>
          Everyone who bids on this auction will be able to claim this
          participation NFT after the auction ends.
        </Body2>
      ) : (
        <Body2 colorClass={ColorClass.Secondary}>
          The primary sale of this piece included a participation NFT.
        </Body2>
      );
    case ClaimState.Claimed: {
      const timeClaimed = claim?.NftTransaction?.timeCreated;
      // Shouldn't be null, but check anyway just to provide a better UX.
      const claimedMessage =
        timeClaimed != null
          ? `Claimed on ${formatTransactionTimestamp(timeClaimed)}.`
          : "Claimed pNFT.";
      return (
        <div className={styles.description}>
          <CheckmarkGradientIcon />
          <Body2 colorClass={ColorClass.Secondary}>{claimedMessage}</Body2>
        </div>
      );
    }
    case ClaimState.Expired: {
      return (
        <Body2 colorClass={ColorClass.Secondary}>
          Claims for this participation NFT have been closed.
        </Body2>
      );
    }
    default:
      return assertUnreachable(claimState);
  }
}

function getNftAssetSizeFromPnftType(
  componentType: NftGenericSupplementaryItemType
) {
  switch (componentType) {
    case "subtle":
      return NftAssetSize.Size64;
    case "standard":
      return NftAssetSize.Size120;
    default:
      return assertUnreachable(componentType);
  }
}

type Props = {
  auctionNftMetadataAccount: PnftInfo_MetadataAccount$key;
  claimsQueryRef: PreloadedQuery<useNftPageClaimsQuery>;
  componentType: NftGenericSupplementaryItemType;
  pnftMetadataAccount: PnftInfo_PnftInfoResponse$key;
};

export default function PnftInfo({
  auctionNftMetadataAccount,
  claimsQueryRef,
  componentType,
  pnftMetadataAccount,
}: Props): Maybe<JSX.Element> {
  const { isMobileBreakpoint } = useBreakpoint();
  const { pnftDropTimes } = useFlagsTyped();
  const [isClaimModalShown, setIsClaimModalShown] = useState(false);
  const auctionNftMetadataAccountData = useFragment(
    nftFragment,
    auctionNftMetadataAccount
  );
  const pnftMetadataAccountData = useFragment(
    pnftFragment,
    pnftMetadataAccount
  );
  const pnftLink = useNftLinkForMetadataAccount(pnftMetadataAccountData);
  const queryData = usePreloadedQuery<useNftPageClaimsQuery>(
    claimsQuery,
    claimsQueryRef
  );
  const { nft: auctionNft, primarySaleHappened } =
    auctionNftMetadataAccountData;

  const claim = queryData.Claim_by_pk;

  const { value, unit } = pnftDropTimes.dropDuration;
  const dropDuration = dayjs.duration(value, unit);

  const claimState = getClaimState(claim, dropDuration);
  const isClaimAvailable = claimState === ClaimState.Available;
  const shouldRenderType = shouldRenderPnftInfoType(
    componentType,
    primarySaleHappened,
    isClaimAvailable
  );

  const shouldRender = auctionNft.pnftIdForAuction != null && shouldRenderType;

  const claimPnftModal = claim != null && (
    <ClaimPnftModal
      claim={claim}
      isShown={isClaimModalShown}
      pnftMetadataAccount={pnftMetadataAccountData}
      auctionNftMetadataAccount={auctionNftMetadataAccountData}
      onHide={() => setIsClaimModalShown(false)}
    />
  );

  const body = (
    <NftGenericSupplementaryItem
      actionButton={getClaimAction({
        claimState,
        isMobileBreakpoint,
        setIsClaimModalShown,
      })}
      componentType={componentType}
      description={getClaimDescriptionText({
        claim,
        claimState,
        componentType,
      })}
      link={pnftLink}
      image={
        <NftAssetForMetadataAccount
          metadataAccount={pnftMetadataAccountData}
          size={getNftAssetSizeFromPnftType(componentType)}
        />
      }
      secondaryTitle={
        componentType === "standard" ? pnftMetadataAccountData.data.name : null
      }
      title={
        <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
          Participation NFT • All Bidders
        </TinyLabel>
      }
    />
  );

  return (
    <>
      {claimPnftModal}
      {shouldRender && body}
    </>
  );
}
