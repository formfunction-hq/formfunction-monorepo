import graphql from "babel-plugin-relay/macro";
import { useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints$key } from "hooks/candy-machine/__generated__/useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints.graphql";
import { useFragment } from "react-relay";

const campaignSectionFragment = graphql`
  fragment useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {
    metadataAccountsForSection: previewMetadataAccounts(
      first: $firstForSections
    ) {
      edges {
        __typename
      }
    }
  }
`;

export default function useAreCandyMachineNftsShown(
  campaignSection: useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints$key
): boolean {
  const campaignSectionData = useFragment(
    campaignSectionFragment,
    campaignSection
  );
  const { metadataAccountsForSection } = campaignSectionData;
  return (
    metadataAccountsForSection != null &&
    metadataAccountsForSection.edges.length > 0
  );
}
