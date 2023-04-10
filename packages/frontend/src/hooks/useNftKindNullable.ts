import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useNftKindNullable_MetadataAccount$key } from "hooks/__generated__/useNftKindNullable_MetadataAccount.graphql";

const fragment = graphql`
  fragment useNftKindNullable_MetadataAccount on MetadataAccount {
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

export default function useNftKindNullable(
  metadataAccount: Maybe<useNftKindNullable_MetadataAccount$key>
): Maybe<NftKind> {
  const metadataAccountData = useFragment(fragment, metadataAccount);

  if (metadataAccountData == null) {
    return null;
  }

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
