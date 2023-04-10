import graphql from "babel-plugin-relay/macro";
import TextButton from "components/buttons/TextButton";
import ClockIcon from "components/icons/ClockIcon";
import CornerUpLeftIcon from "components/icons/CornerUpLeftIcon";
import CrossOctagonIcon from "components/icons/CrossOctagonIcon";
import LinkIcon from "components/icons/LinkIcon";
import MoneyIcon from "components/icons/MoneyIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import ShuffleIcon from "components/icons/ShuffleIcon";
import TagIcon from "components/icons/TagIcon";
import TrashIcon from "components/icons/TrashIcon";
import UserCheckIcon from "components/icons/UserCheckIcon";
import { NftListedOptions_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftListedOptions_MetadataAccount.graphql";
import { message } from "components/toast/messages";
import useViewerId from "hooks/useViewerId";
import { useFragment } from "react-relay";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import getChangePriceButtonText from "utils/nft/getChangePriceButtonText";
import shouldShowAuctionSettings from "utils/nft/shouldShowAuctionSettings";
import shouldShowDeleteOption from "utils/nft/shouldShowDeleteOption";
import shouldShowUnlistOption from "utils/nft/shouldShowUnlistOption";
import getSolscanNftLink from "utils/solana/explorer/getSolscanNftLink";

const fragment = graphql`
  fragment NftListedOptions_MetadataAccount on MetadataAccount {
    mint
    nft {
      CampaignFundingTier {
        __typename
      }

      creatorId
      ownerId
      isOffPlatform
      maxSupply
      editionAllowlistEnabled
      numberOfStandardEditionsMinted
      status
    }
  }
`;

type Props = {
  metadataAccount: NftListedOptions_MetadataAccount$key;
  onClickOption: () => void;
  setIsAddToAllowlistModalShown: (val: boolean) => void;
  setIsAuctionSettingsModalShown: (val: boolean) => void;
  setIsCancelListingModalShown: (val: boolean) => void;
  setIsChangePriceForEditionsModalShown: (val: boolean) => void;
  setIsChangePriceModalShown: (val: boolean) => void;
  setIsDeleteModalShown: (val: boolean) => void;
  setIsEditTagsModalShown: (val: boolean) => void;
  setIsRefreshMetadataModalShown: (val: boolean) => void;
  setIsStopMintingModalShown: (val: boolean) => void;
};

export default function NftListedOptions({
  metadataAccount,
  onClickOption,
  setIsAddToAllowlistModalShown,
  setIsAuctionSettingsModalShown,
  setIsCancelListingModalShown,
  setIsChangePriceForEditionsModalShown,
  setIsChangePriceModalShown,
  setIsDeleteModalShown,
  setIsEditTagsModalShown,
  setIsRefreshMetadataModalShown,
  setIsStopMintingModalShown,
}: Props) {
  const viewerId = useViewerId();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { nft } = metadataAccountData;
  const { status } = nft;

  const showChangePriceOption =
    status !== "ListedEditions" || nft.numberOfStandardEditionsMinted === 0;

  const numberOfStandardEditionsMinted =
    nft.numberOfStandardEditionsMinted ?? 0;
  const showStopMintingOption =
    status === "ListedEditions" &&
    ((nft.maxSupply != null &&
      numberOfStandardEditionsMinted < nft.maxSupply) ||
      nft.maxSupply == null);

  const isOwner = nft.ownerId === viewerId;
  const isCreator = nft.creatorId === viewerId;

  return (
    <>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.NavLink}
        icon={<TagIcon colorValue={ColorValue.Primary} />}
        onClick={() => {
          onClickOption();
          setIsEditTagsModalShown(true);
        }}
      >
        Edit tags
      </TextButton>
      {shouldShowAuctionSettings(status) && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.NavLink}
          icon={<ClockIcon colorValue={ColorValue.Primary} />}
          onClick={() => {
            onClickOption();
            setIsAuctionSettingsModalShown(true);
          }}
        >
          Edit auction settings
        </TextButton>
      )}
      {isCreator &&
        isOwner &&
        nft.status === "ListedEditions" &&
        nft.editionAllowlistEnabled && (
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.Primary}
            fontClass={FontClass.NavLink}
            icon={<UserCheckIcon colorValue={ColorValue.Primary} />}
            onClick={() => {
              onClickOption();
              setIsAddToAllowlistModalShown(true);
            }}
          >
            Add to allowlist
          </TextButton>
        )}
      {showChangePriceOption && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.NavLink}
          icon={<MoneyIcon colorValue={ColorValue.Primary} />}
          onClick={() => {
            if (status === "ListedEditions") {
              onClickOption();
              setIsChangePriceForEditionsModalShown(true);
            } else {
              onClickOption();
              setIsChangePriceModalShown(true);
            }
          }}
        >
          {getChangePriceButtonText(metadataAccountData.nft.status)}
        </TextButton>
      )}
      {shouldShowUnlistOption(status) && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.NavLink}
          icon={<CornerUpLeftIcon colorValue={ColorValue.Primary} />}
          onClick={() => {
            onClickOption();
            setIsCancelListingModalShown(true);
          }}
        >
          Unlist NFT
        </TextButton>
      )}
      {showStopMintingOption && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.NavLink}
          icon={<CrossOctagonIcon colorValue={ColorValue.Primary} />}
          onClick={() => {
            onClickOption();
            setIsStopMintingModalShown(true);
          }}
        >
          Stop minting
        </TextButton>
      )}
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.NavLink}
        icon={<LinkIcon colorValue={ColorValue.Primary} />}
        onClick={() => {
          onClickOption();
          navigator.clipboard.writeText(window.location.href);
          message({ content: "Copied link to clipboard" });
        }}
      >
        Copy link to NFT
      </TextButton>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.NavLink}
        icon={<RefreshIcon size={24} colorValue={ColorValue.Primary} />}
        onClick={() => {
          onClickOption();
          setIsRefreshMetadataModalShown(true);
        }}
      >
        Sync NFT
      </TextButton>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.NavLink}
        href={getSolscanNftLink(metadataAccountData.mint)}
        icon={<ShuffleIcon colorValue={ColorValue.Primary} />}
        type="link_external"
      >
        View transfers
      </TextButton>
      {isCreator &&
        shouldShowDeleteOption(nft.status) &&
        !nft.isOffPlatform &&
        nft.CampaignFundingTier == null && (
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.Error}
            fontClass={FontClass.NavLink}
            icon={<TrashIcon colorValue={ColorValue.Error} />}
            onClick={() => {
              onClickOption();
              setIsDeleteModalShown(true);
            }}
          >
            Remove from Formfunction
          </TextButton>
        )}
    </>
  );
}
