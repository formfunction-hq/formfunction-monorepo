import graphql from "babel-plugin-relay/macro";
import ListingCardGeneric from "components/auction/ListingCardGeneric";
import ListingCardImage from "components/auction/ListingCardImage";
import NftOtherInfo from "components/auction/NftOtherInfo";
import { ListingCardForMetadata_MetadataAccount$key } from "components/auction/__generated__/ListingCardForMetadata_MetadataAccount.graphql";
import ArtistPillButton from "components/buttons/ArtistPillButton";
import ArtistPillButtonForUserExpress from "components/buttons/ArtistPillButtonForUserExpress";
import { NftPageContextProvider } from "context/NftPageContext";
import { useFragment } from "react-relay";
import { Link } from "react-router-dom";
import VideoQuality from "types/enums/VideoQuality";
import shortenAddress from "utils/shortenAddress";
import styles from "css/auction/ListingCardForMetadata.module.css";
import RefreshGradientIcon from "components/icons/RefreshGradientIcon";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import shouldDisplayCollaborator from "utils/shouldDisplayCollaborator";
import isListedForSale from "utils/nft/isListedForSale";
import ListingCardPill from "components/auction/ListingCardPill";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import ListingCardNftKindPill, {
  willRenderNftKindPill,
} from "components/auction/ListingCardNftKindPill";
import useNftKind from "hooks/useNftKind";
import GlobalClass from "types/enums/GlobalClass";
import useColorModeContext from "hooks/useColorModeContext";
import RefreshIcon from "components/icons/RefreshIcon";
import ColorValue from "types/enums/ColorValue";
import useNftLinkForMetadataAccount from "hooks/useNftLinkForMetadataAccount";
import LISTING_CARD_MAX_WIDTH from "constants/ListingCardMaxWidth";
import MediaType from "types/enums/MediaType";
import ColorClass from "types/enums/ColorClass";
import EyeOffIcon from "components/icons/EyeOffIcon";
import FlexBox from "components/layout/FlexBox";
import Body1Medium from "components/text/Body1Medium";
import useUserContext from "hooks/useUserContext";
import useDoesNftHaveDisclosure from "hooks/useDoesNftHaveDisclosure";

const fragment = graphql`
  fragment ListingCardForMetadata_MetadataAccount on MetadataAccount {
    assetHeight
    assetWidth
    contentType
    primarySaleHappened
    videoPlaybackId
    videoPreviewPlaybackId

    data {
      name
      creators {
        address
        # eslint-disable-next-line relay/unused-fields
        share
        status
        user {
          ProfilePhoto {
            photoUrl
          }
        }
      }
    }

    offchainData {
      listingCardImage: image
    }

    nft {
      creatorId
      isImported
      status
      Creator {
        ...ArtistPillButtonForUserExpress_UserExpress
      }

      ...useDoesNftHaveDisclosure_NftExpress
    }

    ...useNftLinkForMetadataAccount_MetadataAccount
    ...useNftKind_MetadataAccount
    ...ListingCardNftKindPill_MetadataAccount
    ...NftPageContext_MetadataAccount
    ...NftOtherInfo_MetadataAccount
  }
`;

type Props = {
  artistPillButtonOverride?: JSX.Element;
  cardAnimationClass?:
    | GlobalClass.CardAnimation
    | GlobalClass.CardAnimationNoTransform;
  collaboratorsToShowWithoutApproval?: Array<string>;
  desiredVideoQuality?: VideoQuality;
  disableLink?: boolean;
  enableMaxWidth?: boolean;
  hideOtherInfo?: boolean;
  hidePillButtons?: boolean;
  isBlurredOverride?: boolean;
  metadataAccount: ListingCardForMetadata_MetadataAccount$key;
  nftKindPillOverride?: JSX.Element;
};

export default function ListingCardForMetadata({
  artistPillButtonOverride,
  cardAnimationClass,
  collaboratorsToShowWithoutApproval = [],
  desiredVideoQuality = VideoQuality.X1,
  disableLink = false,
  enableMaxWidth = false,
  hideOtherInfo = false,
  hidePillButtons = false,
  isBlurredOverride,
  metadataAccount,
  nftKindPillOverride,
}: Props): JSX.Element {
  const { user } = useUserContext();
  const { isDarkMode } = useColorModeContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);
  const nftLink = useNftLinkForMetadataAccount(metadataAccountData);
  const { nft } = metadataAccountData;
  const isNftNsfw = useDoesNftHaveDisclosure(nft, "Nsfw");
  const collabSrcs = [...(metadataAccountData.data.creators ?? [])]
    .filter(
      (creator) =>
        shouldDisplayCollaborator(creator, nft.creatorId) ||
        collaboratorsToShowWithoutApproval.includes(creator.address)
    )
    .sort(getCompareByProperty("share", SortOrder.Desc))
    .map((creator) => creator.user?.ProfilePhoto?.photoUrl ?? null);
  const creator = nft.Creator;
  const artistPillButton =
    artistPillButtonOverride != null ? (
      artistPillButtonOverride
    ) : creator == null ? (
      <ArtistPillButton
        collabSrcs={collabSrcs}
        disableLink
        name={shortenAddress(nft.creatorId)}
      />
    ) : (
      <ArtistPillButtonForUserExpress collabSrcs={collabSrcs} user={creator} />
    );
  const nftKindPill =
    nftKindPillOverride ??
    (willRenderNftKindPill(nftKind, nft.isImported) ? (
      <ListingCardNftKindPill metadataAccount={metadataAccountData} />
    ) : null);
  const secondaryPill =
    (isListedForSale(nft.status) || nft.status === "Auction") &&
    metadataAccountData.primarySaleHappened ? (
      <ListingCardPill
        icon={
          isDarkMode ? (
            <RefreshIcon size={24} colorValue={ColorValue.BrightPurple} />
          ) : (
            <RefreshGradientIcon />
          )
        }
        pillStyle={nftKindPill != null ? "compressed" : "standard"}
        text="Secondary"
      />
    ) : null;
  const shouldShowNsfwBlur =
    isBlurredOverride != null
      ? isBlurredOverride
      : isNftNsfw && (user == null || user.shouldBlurNsfwContent);
  const image = (
    <ListingCardImage
      isBlurred={shouldShowNsfwBlur}
      overlayContent={
        shouldShowNsfwBlur ? (
          <FlexBox gap={8} alignItems="center">
            <EyeOffIcon colorValue={ColorValue.White} />
            <Body1Medium colorClass={ColorClass.White}>NSFW</Body1Medium>
          </FlexBox>
        ) : undefined
      }
      isWideAsset={
        (metadataAccountData.assetWidth ?? 0) >
        (metadataAccountData.assetHeight ?? 0)
      }
      mediaType={metadataAccountData.contentType as MediaType}
      src={metadataAccountData.offchainData.listingCardImage}
      videoPlaybackId={
        metadataAccountData.videoPreviewPlaybackId ??
        metadataAccountData.videoPlaybackId
      }
      desiredVideoQuality={desiredVideoQuality}
      pills={hidePillButtons ? [] : filterNulls([nftKindPill, secondaryPill])}
    />
  );

  const listingCard = (
    <ListingCardGeneric
      artistPillButton={artistPillButton}
      cardAnimationClass={cardAnimationClass}
      enableMaxWidth={enableMaxWidth}
      image={image}
      otherInfo={
        hideOtherInfo ? (
          <div className={styles.hideOtherInfo} />
        ) : (
          <NftOtherInfo metadataAccount={metadataAccountData} />
        )
      }
      title={metadataAccountData.data.name}
    />
  );

  return (
    <NftPageContextProvider
      editionBuyerInfoQueryRef={null}
      loadClaimsQuery={emptyFunction}
      loadEditionBuyerInfoQuery={emptyFunction}
      loadNftQuery={emptyFunction}
      metadataAccount={metadataAccountData}
      nftCampaignQueryRef={null}
    >
      {disableLink ? (
        listingCard
      ) : (
        <Link
          style={{
            maxWidth: enableMaxWidth ? LISTING_CARD_MAX_WIDTH : undefined,
            width: "100%",
          }}
          to={nftLink}
        >
          {listingCard}
        </Link>
      )}
    </NftPageContextProvider>
  );
}
