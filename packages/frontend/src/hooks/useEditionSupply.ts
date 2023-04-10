import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import { useEditionSupply_MetadataAccount$key } from "hooks/__generated__/useEditionSupply_MetadataAccount.graphql";
import useNftKind from "hooks/useNftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const fragment = graphql`
  fragment useEditionSupply_MetadataAccount on MetadataAccount {
    nft {
      maxSupply
      maxSupplyOfMasterEdition
      numberOfStandardEditionsMinted
    }

    ...useNftKind_MetadataAccount
  }
`;

/**
 * Used when we want to display the total supply of an NFT, e.g.
 * - "This NFT has 10 editions"
 * - "Edition #1/10"
 */
export default function useEditionSupply(
  metadataAccount: useEditionSupply_MetadataAccount$key
): Maybe<number> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);
  const { nft } = metadataAccountData;

  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply:
      return nft.maxSupply;
    case NftKind.StandardEditionPrintNonzeroSupply:
      return nft.maxSupplyOfMasterEdition;
    case NftKind.StandardEditionPrintUnlimitedSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.PnftMasterEdition:
    case NftKind.PnftStandardEdition:
      return nft.numberOfStandardEditionsMinted;
    case NftKind.Generative:
    case NftKind.OneOfOne:
      return null;
    default:
      return assertUnreachable(nftKind);
  }
}
