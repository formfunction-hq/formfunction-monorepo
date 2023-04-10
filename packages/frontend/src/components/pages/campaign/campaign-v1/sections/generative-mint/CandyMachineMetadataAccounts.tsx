import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints$key } from "components/pages/campaign/campaign-v1/sections/generative-mint/__generated__/CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints.graphql";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import useNftGridFullWidthColumnCount from "hooks/grids/useNftGridFullWidthColumnCount";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import useAreCandyMachineNftsShown from "hooks/candy-machine/useAreCandyMachineNftsShown";

const campaignSectionFragment = graphql`
  fragment CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {
    metadataAccountsForSection: previewMetadataAccounts(
      first: $firstForSections
    ) {
      edges {
        node {
          id
          ...ListingCardForMetadata_MetadataAccount
        }
      }
    }

    ...useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints
  }
`;

type Props = {
  campaignSection: CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints$key;
};

export default function CandyMachineMetadataAccounts({
  campaignSection,
}: Props) {
  const campaignSectionData = useFragment(
    campaignSectionFragment,
    campaignSection
  );
  const showNfts = useAreCandyMachineNftsShown(campaignSectionData);
  const numNfts = useNftGridFullWidthColumnCount(2);
  const { metadataAccountsForSection } = campaignSectionData;
  return showNfts && metadataAccountsForSection != null ? (
    <NftGridFullWidth>
      {metadataAccountsForSection.edges
        // Since we insert the most recently minted item,
        // we slice here so it doesn't exceed the max allowed amount
        .slice(0, numNfts)
        .map(({ node }) => (
          <ListingCardForMetadata key={node.id} metadataAccount={node} />
        ))}
    </NftGridFullWidth>
  ) : null;
}
