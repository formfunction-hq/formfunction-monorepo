import graphql from "babel-plugin-relay/macro";
import { useDoesNftHaveDisclosure_NftExpress$key } from "hooks/__generated__/useDoesNftHaveDisclosure_NftExpress.graphql";
import { useFragment } from "react-relay";
import NftDisclosureTypeExpress_enum from "types/relay/NftDisclosureTypeExpress_enum";

const fragment = graphql`
  fragment useDoesNftHaveDisclosure_NftExpress on NftExpress {
    disclosures {
      type
    }
  }
`;

export default function useDoesNftHaveDisclosure(
  nft: useDoesNftHaveDisclosure_NftExpress$key,
  disclosureType: NftDisclosureTypeExpress_enum
) {
  const nftData = useFragment(fragment, nft);

  return (
    nftData.disclosures?.map(({ type }) => type).includes(disclosureType) ??
    false
  );
}
