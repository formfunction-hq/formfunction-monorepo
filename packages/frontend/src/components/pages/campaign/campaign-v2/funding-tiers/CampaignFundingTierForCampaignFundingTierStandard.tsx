import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import CampaignFundingTierStandard from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierStandard";
import { CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard$key } from "components/pages/campaign/campaign-v2/funding-tiers/__generated__/CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard.graphql";

const fragment = graphql`
  fragment CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard on CampaignFundingTierStandard {
    benefits {
      description
    }
    title
    description
    id
    metadataAccountsForSection: metadataAccounts(
      first: $firstForFundingTierNfts
    ) {
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
  campaignFundingTier: CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard$key;
};

export default function CampaignFundingTierForCampaignFundingTierStandard({
  campaignFundingTier,
}: Props) {
  const campaignFundingTierData = useFragment(fragment, campaignFundingTier);
  const { metadataAccountsForSection, benefits, description, id, title } =
    campaignFundingTierData;

  const nfts = metadataAccountsForSection?.edges.map(({ node }) => (
    <ListingCardForMetadata key={node.id} metadataAccount={node} />
  ));

  return (
    <CampaignFundingTierStandard
      key={id}
      benefits={benefits?.map(({ description: benefit }) => benefit) ?? []}
      description={description}
      id={id}
      nfts={nfts ?? []}
      title={title}
    />
  );
}
