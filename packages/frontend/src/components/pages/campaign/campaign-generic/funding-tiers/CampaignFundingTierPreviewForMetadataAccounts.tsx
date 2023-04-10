import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import NftAssetSize from "types/enums/NftAssetSize";
import NftAssetForMetadataAccount from "components/images/NftAssetForMetadataAccount";
import CampaignFundingTierPreview from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreview";
import { CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount$key } from "components/pages/campaign/campaign-generic/funding-tiers/__generated__/CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount.graphql";
import SquareContainer from "components/containers/SquareContainer";

const fragment = graphql`
  fragment CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount on MetadataAccount
  @relay(plural: true) {
    id
    ...NftAssetForMetadataAccount_MetadataAccount
  }
`;

type Props = {
  campaignSectionId: string;
  description: string;
  metadataAccounts: CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount$key;
  onClickAddNfts?: () => void;
  setCampaignTab: (val: CampaignTab) => void;
  title: string;
};

export default function CampaignFundingTierPreviewForMetadataAccounts({
  campaignSectionId,
  title,
  metadataAccounts,
  onClickAddNfts,
  description,
  setCampaignTab,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccounts);
  const assets =
    metadataAccountData.map((item) => (
      <SquareContainer key={item.id}>
        <NftAssetForMetadataAccount
          metadataAccount={item}
          size={NftAssetSize.Size100Percent}
        />
      </SquareContainer>
    )) ?? [];

  return (
    <CampaignFundingTierPreview
      assets={assets}
      campaignSectionId={campaignSectionId}
      description={description}
      setCampaignTab={setCampaignTab}
      onClickAddNfts={onClickAddNfts}
      title={title}
    />
  );
}
