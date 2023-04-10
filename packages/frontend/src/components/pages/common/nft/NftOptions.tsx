import graphql from "babel-plugin-relay/macro";
import TextButton from "components/buttons/TextButton";
import AlertIcon from "components/icons/AlertIcon";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import LinkIcon from "components/icons/LinkIcon";
import RefreshIcon from "components/icons/RefreshIcon";
import ShuffleIcon from "components/icons/ShuffleIcon";
import TrashIcon from "components/icons/TrashIcon";
import { NftOptions_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftOptions_MetadataAccount.graphql";
import { MAILTO_HELLO_EMAIL } from "constants/Emails";
import { useFragment } from "react-relay";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import copyTextToClipboard from "utils/copyTextToClipboard";
import shouldShowBurnOption from "utils/nft/shouldShowBurnOption";
import shouldShowTransferOption from "utils/nft/shouldShowTransferOption";
import getSolscanNftLink from "utils/solana/explorer/getSolscanNftLink";
import useViewerId from "hooks/useViewerId";
import FlameIcon from "components/icons/FlameIcon";
import shouldShowDeleteOption from "utils/nft/shouldShowDeleteOption";

const fragment = graphql`
  fragment NftOptions_MetadataAccount on MetadataAccount {
    mint

    nft {
      CampaignFundingTier {
        __typename
      }

      creatorId
      isOffPlatform
      numberOfStandardEditionsMinted
      ownerId
      status
    }
  }
`;

type Props = {
  metadataAccount: NftOptions_MetadataAccount$key;
  onClickOption: () => void;
  setIsBurnModalShown: (val: boolean) => void;
  setIsDeleteModalShown: (val: boolean) => void;
  setIsRefreshMetadataModalShown: (val: boolean) => void;
  setIsTransferModalShown: (val: boolean) => void;
};

export default function NftOptions({
  metadataAccount,
  onClickOption,
  setIsBurnModalShown,
  setIsDeleteModalShown,
  setIsRefreshMetadataModalShown,
  setIsTransferModalShown,
}: Props) {
  const viewerId = useViewerId();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { nft } = metadataAccountData;
  const isCreatorOwner = nft.creatorId === nft.ownerId;
  const isCreator = nft.creatorId === viewerId;
  const isOwner = nft.ownerId === viewerId;

  return (
    <>
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
        icon={<LinkIcon colorValue={ColorValue.Primary} />}
        onClick={() => {
          onClickOption();
          copyTextToClipboard(window.location.href, "Copied link to clipboard");
        }}
      >
        Copy link to NFT
      </TextButton>
      {isOwner &&
        shouldShowTransferOption(nft.status) &&
        !nft.isOffPlatform && (
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.Primary}
            fontClass={FontClass.NavLink}
            icon={<ArrowRightIcon colorValue={ColorValue.Primary} size={24} />}
            onClick={() => {
              onClickOption();
              setIsTransferModalShown(true);
            }}
          >
            Transfer NFT
          </TextButton>
        )}
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.NavLink}
        href={getSolscanNftLink(metadataAccountData.mint)}
        icon={<ShuffleIcon colorValue={ColorValue.Primary} />}
        type="link_external"
      >
        View transfers
      </TextButton>
      {!isCreator && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Error}
          fontClass={FontClass.NavLink}
          href={`${MAILTO_HELLO_EMAIL}?subject=Formfunction: Reporting NFT ${metadataAccountData.mint}&body=Please explain why you are reporting this NFT`}
          icon={<AlertIcon colorValue={ColorValue.Error} />}
          onClick={onClickOption}
          type="link_external"
        >
          Report NFT
        </TextButton>
      )}
      {isCreatorOwner &&
        isOwner &&
        shouldShowBurnOption(
          nft.status,
          nft.numberOfStandardEditionsMinted ?? 0
        ) &&
        !nft.isOffPlatform &&
        nft.CampaignFundingTier == null && (
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.Error}
            fontClass={FontClass.NavLink}
            icon={<FlameIcon colorValue={ColorValue.Error} />}
            onClick={() => {
              onClickOption();
              setIsBurnModalShown(true);
            }}
          >
            Burn NFT
          </TextButton>
        )}
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
