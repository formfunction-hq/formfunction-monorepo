import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import SquareContainer from "components/containers/SquareContainer";
import AssetForNftAsset from "components/assets/AssetForNftAsset";
import { Dayjs } from "dayjs";
import { ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2$key } from "components/pages/explore/__generated__/ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2.graphql";
import ExploreCampaignCardForCampaignV2 from "components/pages/explore/ExploreCampaignCardForCampaignV2";

const fragment = graphql`
  fragment ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2 on CampaignV2 {
    ...ExploreCampaignCardForCampaignV2_CampaignV2

    nftAssets(input: { first: 3 }) {
      ...AssetForNftAsset_NftAsset
      nftInfo {
        mint
      }
    }
  }
`;

type Props = {
  campaign: ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2$key;
  hasShadow?: boolean;
  launchDate?: Dayjs | string;
};

export default function ExploreCampaignCardForCampaignV2WithNftAssets({
  campaign,
  hasShadow,
  launchDate,
}: Props) {
  const campaignData = useFragment(fragment, campaign);
  const nftAssets = campaignData.nftAssets.map((nftAsset) => (
    <SquareContainer key={nftAsset.nftInfo.mint}>
      <AssetForNftAsset
        asset={nftAsset}
        borderRadius={16}
        imgixWidth={200}
        objectFit="cover"
        height="100%"
        showDropShadow
        width="100%"
      />
    </SquareContainer>
  ));

  return (
    <ExploreCampaignCardForCampaignV2
      campaign={campaignData}
      hasShadow={hasShadow}
      launchDate={launchDate}
      nftAssets={nftAssets}
    />
  );
}
