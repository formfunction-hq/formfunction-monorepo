import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import { CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard$key } from "components/pages/campaign/campaign-v2/funding-tiers/__generated__/CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard.graphql";
import CampaignFundingTierPreviewForMetadataAccounts from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreviewForMetadataAccounts";
import { FundingTierNftsContextProvider } from "components/pages/campaign/edit/funding-tiers/FundingTierNftsContext";
import CampaignFundingTierManageNftsModal from "components/pages/campaign/edit/funding-tiers/CampaignFundingTierManageNftsModal";
import { useState } from "react";

const fragment = graphql`
  fragment CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard on CampaignFundingTierStandard {
    description
    title
    id
    metadataAccountsForPreview: metadataAccounts(first: $firstForPreviewNfts) {
      edges {
        node {
          ...CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount
        }
      }
    }

    ...CampaignFundingTierManageNftsModal_CampaignFundingTierStandard
    ...FundingTierNftsContext_CampaignFundingTierStandard
  }
`;

type Props = {
  campaignFundingTier: CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard$key;
  setCampaignTab: (val: CampaignTab) => void;
  shouldShowAddNftsButton: boolean;
};

export default function CampaignFundingTierPreviewForCampaignFundingTierStandard({
  campaignFundingTier,
  setCampaignTab,
  shouldShowAddNftsButton,
}: Props) {
  const campaignFundingTierData = useFragment(fragment, campaignFundingTier);
  const [showAddNftsModal, setShowAddNftsModal] = useState(false);
  const metadataAccountNodes =
    campaignFundingTierData.metadataAccountsForPreview?.edges.map(
      ({ node }) => node
    ) ?? [];
  const { id, title, description } = campaignFundingTierData;
  const content = (
    <CampaignFundingTierPreviewForMetadataAccounts
      metadataAccounts={metadataAccountNodes}
      title={title}
      campaignSectionId={id}
      description={description}
      setCampaignTab={setCampaignTab}
      onClickAddNfts={
        shouldShowAddNftsButton ? () => setShowAddNftsModal(true) : undefined
      }
    />
  );

  return shouldShowAddNftsButton ? (
    <FundingTierNftsContextProvider
      allowDelete={false}
      fundingTier={campaignFundingTierData}
    >
      <CampaignFundingTierManageNftsModal
        isShown={showAddNftsModal}
        onHide={() => {
          setShowAddNftsModal(false);
        }}
        fundingTier={campaignFundingTierData}
      />
      {content}
    </FundingTierNftsContextProvider>
  ) : (
    content
  );
}
