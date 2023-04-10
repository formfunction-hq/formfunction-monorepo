import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import GenericCampaignSectionPreview from "components/pages/campaign/campaign-v1/sections/GenericCampaignSectionPreview";
import { CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$key } from "components/pages/campaign/campaign-v1/sections/__generated__/CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints.graphql";

const campaignSectionFragment = graphql`
  fragment CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {
    description
    title
    id
    previewMetadataAccounts(first: $firstForPreviewNfts) {
      edges {
        node {
          ...GenericCampaignSectionPreview_MetadataAccount
        }
      }
    }
  }
`;

type Props = {
  campaignSection: CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$key;
  setCampaignTab: (val: CampaignTab) => void;
};

export default function CampaignSectionPreviewForCampaignSectionWithGenerativeMint({
  campaignSection,
  setCampaignTab,
}: Props) {
  const campaignSectionData = useFragment(
    campaignSectionFragment,
    campaignSection
  );
  const metadataAccountNodes =
    campaignSectionData.previewMetadataAccounts?.edges.map(
      ({ node }) => node
    ) ?? [];
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
