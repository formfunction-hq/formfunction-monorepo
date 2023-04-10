import graphql from "babel-plugin-relay/macro";
import { CampaignHeroAssets_CampaignExpress$key } from "components/pages/campaign/campaign-v1/__generated__/CampaignHeroAssets_CampaignExpress.graphql";
import { useFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CampaignHeroAssetsGeneric from "components/pages/campaign/campaign-generic/hero/CampaignHeroAssets";

const campaignFragment = graphql`
  fragment CampaignHeroAssets_CampaignExpress on CampaignExpress {
    heroAssets {
      ...CampaignHeroAssets_AssetExpress
    }
  }
`;

type Props = {
  campaign: CampaignHeroAssets_CampaignExpress$key;
};

export default function CampaignHeroAssets({
  campaign,
}: Props): Maybe<JSX.Element> {
  const campaignData = useFragment(campaignFragment, campaign);
  if (campaignData.heroAssets == null) {
    // TODO[@arcticmatt][campaigns]: check how campaigns with no hero assets look
    return null;
  }

  return <CampaignHeroAssetsGeneric assets={campaignData.heroAssets} />;
}
