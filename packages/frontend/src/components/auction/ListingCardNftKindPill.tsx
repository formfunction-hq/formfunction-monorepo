import graphql from "babel-plugin-relay/macro";
import ListingCardPill from "components/auction/ListingCardPill";
import { ListingCardNftKindPill_MetadataAccount$key } from "components/auction/__generated__/ListingCardNftKindPill_MetadataAccount.graphql";
import GiftIcon from "components/icons/GiftIcon";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useEditionSupply from "hooks/useEditionSupply";
import useNftKind from "hooks/useNftKind";
import { useFragment } from "react-relay";
import ColorValue from "types/enums/ColorValue";
import pluralize from "formfn-shared/dist/utils/pluralize";
import LayersIcon from "components/icons/LayersIcon";
import shouldShowOpenEditionsCopy from "utils/nft/shouldShowOpenEditionsCopy";

export function willRenderNftKindPill(nftKind: NftKind, isImported: boolean) {
  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.PnftMasterEdition:
    case NftKind.PnftStandardEdition:
      return true;
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply:
      if (isImported) {
        // We don't want to render this for imported NFTs because we may not import
        // all the information necessary to render the correct pill info.
        //
        // E.g. for standard edition mints, we don't import the master edition mint, and so
        // don't know the max supply.
        return false;
      }
      return true;
    case NftKind.Generative:
    case NftKind.OneOfOne:
      return false;
    default:
      return assertUnreachable(nftKind);
  }
}

const fragment = graphql`
  fragment ListingCardNftKindPill_MetadataAccount on MetadataAccount {
    nft {
      edition
      status
    }

    ...useEditionSupply_MetadataAccount
    ...useNftKind_MetadataAccount
  }
`;

type Props = {
  metadataAccount: ListingCardNftKindPill_MetadataAccount$key;
};

export default function ListingCardNftKindPill({
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);
  const layersIcon = (
    <LayersIcon colorValue={ColorValue.BrightPurple} size={24} />
  );
  const { nft } = metadataAccountData;
  const supply = useEditionSupply(metadataAccountData);

  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply:
      return (
        <ListingCardPill
          icon={layersIcon}
          text={`${supply} ${pluralize("edition", supply!)}`}
        />
      );
    case NftKind.MasterEditionWithUnlimitedSupply: {
      return shouldShowOpenEditionsCopy(nft.status) ? (
        <ListingCardPill icon={layersIcon} text="Open editions" />
      ) : (
        <ListingCardPill
          icon={layersIcon}
          text={`${supply} ${pluralize("edition", supply!)}`}
        />
      );
    }
    case NftKind.StandardEditionPrintNonzeroSupply:
      return (
        <ListingCardPill
          icon={layersIcon}
          text={`#${nft.edition} / ${supply}`}
        />
      );
    case NftKind.StandardEditionPrintUnlimitedSupply:
      return <ListingCardPill icon={layersIcon} text={`#${nft.edition}`} />;
    case NftKind.PnftMasterEdition:
    case NftKind.PnftStandardEdition:
      return (
        <ListingCardPill
          icon={<GiftIcon size={24} colorValue={ColorValue.BrightPurple} />}
          pillStyle="compressed"
        />
      );
    case NftKind.Generative:
    case NftKind.OneOfOne:
      return null;
    default:
      return assertUnreachable(nftKind);
  }
}
