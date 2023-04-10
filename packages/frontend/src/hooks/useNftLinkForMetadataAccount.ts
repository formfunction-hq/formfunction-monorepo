import graphql from "babel-plugin-relay/macro";
import { useNftLinkForMetadataAccount_MetadataAccount$key } from "hooks/__generated__/useNftLinkForMetadataAccount_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";

const fragment = graphql`
  fragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {
    assetHeight
    assetWidth
    mint

    nft {
      masterEditionMint

      Creator {
        username
      }

      Owner {
        username
      }
    }
  }
`;

export default function useNftLinkForMetadataAccount(
  metadataAccount: useNftLinkForMetadataAccount_MetadataAccount$key,
  linkToMasterEdition = false
): string {
  const metadataAccountData = useFragment(fragment, metadataAccount);

  return getNftLinkRelative(
    metadataAccountData.nft.Owner?.username ??
      metadataAccountData.nft.Creator?.username,
    linkToMasterEdition
      ? metadataAccountData.nft.masterEditionMint!
      : metadataAccountData.mint,
    metadataAccountData.assetWidth,
    metadataAccountData.assetHeight
  );
}
