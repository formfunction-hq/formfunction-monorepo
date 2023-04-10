import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ListNftModal_MetadataAccount$key } from "components/modal/__generated__/ListNftModal_MetadataAccount.graphql";
import ListOneOfOneModal from "components/modal/ListOneOfOneModal";
import useNftKind from "hooks/useNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import ListEditionsModal from "components/modal/ListEditionsModal";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const fragment = graphql`
  fragment ListNftModal_MetadataAccount on MetadataAccount {
    ...useNftKind_MetadataAccount
    ...ListEditionsModal_MetadataAccount
    ...ListOneOfOneModal_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: ListNftModal_MetadataAccount$key;
  onHide: () => void;
};

export default function ListNftModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);

  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
      return (
        <ListEditionsModal
          isShown={isShown}
          metadataAccount={metadataAccountData}
          onHide={onHide}
        />
      );
    case NftKind.PnftStandardEdition:
    case NftKind.Generative:
    case NftKind.OneOfOne:
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply:
      return (
        // TODO: rename ListOneOfOne modal to something more accurate
        <ListOneOfOneModal
          isShown={isShown}
          metadataAccount={metadataAccountData}
          onHide={onHide}
        />
      );
    case NftKind.PnftMasterEdition:
      // We don't allow the pNFT master edition to be listed
      return null;
    default:
      assertUnreachable(nftKind);
  }
}
