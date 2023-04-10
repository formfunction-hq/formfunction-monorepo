import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import { CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts$key } from "components/pages/campaign/campaign-v1/sections/__generated__/CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts.graphql";
import GenericCampaignSectionPreview from "components/pages/campaign/campaign-v1/sections/GenericCampaignSectionPreview";

const campaignSectionFragment = graphql`
  fragment CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts on CampaignSectionWithNfts {
    description
    title
    id
    metadataAccounts(first: $firstForPreviewNfts) {
      edges {
        node {
          ...GenericCampaignSectionPreview_MetadataAccount
        }
      }
    }
  }
`;

type Props = {
  campaignSection: CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts$key;
  setCampaignTab: (val: CampaignTab) => void;
};

export default function CampaignSectionPreviewForCampaignSectionWithNfts({
  campaignSection,
  setCampaignTab,
}: Props) {
  const campaignSectionData = useFragment(
    campaignSectionFragment,
    campaignSection
  );
  const metadataAccountNodes =
    campaignSectionData.metadataAccounts?.edges.map(({ node }) => node) ?? [];
  const { id, title, description } = campaignSectionData;

  return (
    <GenericCampaignSectionPreview
      metadataAccounts={metadataAccountNodes}
      title={title}
      campaignSectionId={id}
      description={description}
      setCampaignTab={setCampaignTab}
    />
  );
}
