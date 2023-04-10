import graphql from "babel-plugin-relay/macro";
import { useNftKind_MetadataAccount$key } from "hooks/__generated__/useNftKind_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";

const fragment = graphql`
  fragment useNftKind_MetadataAccount on MetadataAccount {
    nft {
      isMasterEdition
      isPnft
      maxSupplyOnchain
      maxSupplyOfMasterEdition

      CandyMachine {
        __typename
      }
    }
  }
`;

export default function useNftKind(
  metadataAccount: useNftKind_MetadataAccount$key
): NftKind {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const {
    isMasterEdition,
    isPnft,
    maxSupplyOnchain,
    maxSupplyOfMasterEdition,
    CandyMachine,
  } = metadataAccountData.nft;

  return getNftKind(
    isMasterEdition,
    isPnft,
    maxSupplyOnchain,
    maxSupplyOfMasterEdition,
    CandyMachine != null
  );
}
