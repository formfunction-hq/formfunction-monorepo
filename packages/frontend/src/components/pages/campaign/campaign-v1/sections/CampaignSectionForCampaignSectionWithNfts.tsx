import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import { CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts$key } from "components/pages/campaign/campaign-v1/sections/__generated__/CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts.graphql";
import CampaignFundingTierStandard from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierStandard";

const campaignSectionFragment = graphql`
  fragment CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts on CampaignSectionWithNfts {
    benefits
    title
    description
    id
    metadataAccountsForSection: metadataAccounts(first: $firstForSections) {
      edges {
        node {
          id
          ...ListingCardForMetadata_MetadataAccount
        }
      }
    }
  }
`;

type Props = {
  campaignSection: CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts$key;
};

export default function CampaignSectionForCampaignSectionWithNfts({
  campaignSection,
}: Props) {
  const campaignSectionData = useFragment(
    campaignSectionFragment,
    campaignSection
  );

  const nfts = campaignSectionData.metadataAccountsForSection?.edges.map(
    ({ node }) => (
      <ListingCardForMetadata key={node.id} metadataAccount={node} />
    )
  );

  return (
    <CampaignFundingTierStandard
      benefits={campaignSectionData.benefits}
      description={campaignSectionData.description}
      id={campaignSectionData.id}
      nfts={nfts ?? []}
      title={campaignSectionData.title}
    />
  );
}
