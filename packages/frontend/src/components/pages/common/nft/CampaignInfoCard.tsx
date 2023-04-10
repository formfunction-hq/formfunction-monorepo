import graphql from "babel-plugin-relay/macro";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import { useNftPageCampaignQuery } from "hooks/nft-page/__generated__/useNftPageCampaignQuery.graphql";
import { nftCampaignQuery } from "hooks/nft-page/useNftPageCampaign";
import { Suspense } from "react";
import { CampaignInfoCard_CampaignsNamespaceQueryResponse$key } from "components/pages/common/nft/__generated__/CampaignInfoCard_CampaignsNamespaceQueryResponse.graphql";
import NftInfoCard from "components/pages/common/nft/NftInfoCard";
import useCampaignLinkForCampaignV2 from "hooks/campaign/useCampaignLinkForCampaignV2";

const fragment = graphql`
  fragment CampaignInfoCard_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignForNft(input: $input) {
      campaign {
        previewAsset {
          downloadUrl
        }
        title

        ...useCampaignLinkForCampaignV2_CampaignV2
      }
    }
  }
`;

function FragmentLoader({
  campaignsNamespace,
}: {
  campaignsNamespace: CampaignInfoCard_CampaignsNamespaceQueryResponse$key;
}) {
  const campaignsNamespaceData = useFragment(fragment, campaignsNamespace);
  const { campaign } = campaignsNamespaceData.campaignForNft;
  const campaignLink = useCampaignLinkForCampaignV2(campaign);

  if (campaign == null) {
    return null;
  }

  return (
    <NftInfoCard
      href={campaignLink!}
      label="From this campaign"
      name={campaign.title}
      previewPhotoUrl={campaign.previewAsset.downloadUrl}
    />
  );
}

type Props = {
  nftCampaignQueryRef: PreloadedQuery<useNftPageCampaignQuery>;
};

function DataLoader({ nftCampaignQueryRef }: Props) {
  const data = usePreloadedQuery(nftCampaignQuery, nftCampaignQueryRef);
  return <FragmentLoader campaignsNamespace={data.CampaignsNamespace} />;
}

export default function CampaignInfoCard({ nftCampaignQueryRef }: Props) {
  return (
    <Suspense fallback={null}>
      <DataLoader nftCampaignQueryRef={nftCampaignQueryRef} />
    </Suspense>
  );
}
