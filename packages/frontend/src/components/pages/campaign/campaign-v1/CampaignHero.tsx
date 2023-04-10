import graphql from "babel-plugin-relay/macro";
import { CampaignHero_CampaignExpress$key } from "components/pages/campaign/campaign-v1/__generated__/CampaignHero_CampaignExpress.graphql";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { campaignQuery } from "hooks/campaign-page/v1/useCampaignPageCampaign";
import { useCampaignPageCampaignQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageCampaignQuery.graphql";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import ArtistPillButtonForUserExpress from "components/buttons/ArtistPillButtonForUserExpress";
import CampaignProgressTowardsGoal from "components/pages/campaign/campaign-v1/CampaignProgressTowardsGoal";
import CampaignHeroAssets from "components/pages/campaign/campaign-v1/CampaignHeroAssets";
import useSetPageTitle from "hooks/useSetPageTitle";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import scrollElementIntoView from "utils/scroll/scrollElementIntoView";
import ElementId from "types/enums/ElementId";
import Page404Content from "components/pages/errors/Page404Content";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import CampaignHeroTop from "components/pages/campaign/campaign-generic/hero/CampaignHeroTop";
import CampaignHeroGeneric from "components/pages/campaign/campaign-generic/hero/CampaignHero";

const campaignFragment = graphql`
  fragment CampaignHero_CampaignExpress on CampaignExpress {
    creator {
      ...ArtistPillButtonForUserExpress_UserExpress
    }
    ...CampaignProgressTowardsGoal_CampaignExpress

    description
    title

    logoAsset {
      ...AssetForAssetExpress_AssetExpress
    }

    socialLinks {
      discord
      instagram
      twitter
      website
    }

    ...CampaignHeroAssets_CampaignExpress
  }
`;

type InnerProps = {
  campaign: CampaignHero_CampaignExpress$key;
  campaignActivity: MaybeUndef<JSX.Element>;
  setCampaignTab: (val: CampaignTab) => void;
};

function Inner({ campaign, campaignActivity, setCampaignTab }: InnerProps) {
  const campaignData = useFragment(campaignFragment, campaign);
  useSetPageTitle(campaignData.title);

  const heroTop = (
    <CampaignHeroTop
      artistPillButton={
        <ArtistPillButtonForUserExpress user={campaignData.creator} />
      }
      description={campaignData.description}
      logoAsset={
        campaignData.logoAsset == null ? null : (
          <AssetForAssetExpress
            asset={campaignData.logoAsset}
            // TODO[@arcticmatt]: may need to adjust image sizing, this just makes it look good for popheadz
            height={121}
            objectFit="cover"
            showDropShadow={false}
            showShimmer={false}
            width="auto"
          />
        )
      }
      onClickLearnMore={() => {
        setCampaignTab(CampaignTab.About);
        scrollElementIntoView(ElementId.CampaignTabs);
      }}
      socialLinks={{
        discord: campaignData.socialLinks?.discord,
        instagram: campaignData.socialLinks?.instagram,
        twitter: campaignData.socialLinks?.twitter,
        website: campaignData.socialLinks?.website,
      }}
      title={campaignData.title}
    />
  );

  return (
    <CampaignHeroGeneric
      activity={campaignActivity}
      assets={<CampaignHeroAssets campaign={campaignData} />}
      progressTowardsGoal={
        <CampaignProgressTowardsGoal campaign={campaignData} />
      }
      top={heroTop}
    />
  );
}

type Props = {
  campaignActivity: MaybeUndef<JSX.Element>;
  campaignQueryRef: PreloadedQuery<useCampaignPageCampaignQuery>;
  setCampaignTab: (val: CampaignTab) => void;
};

export default function CampaignHero({
  campaignActivity,
  campaignQueryRef,
  setCampaignTab,
}: Props): Maybe<JSX.Element> {
  const data = usePreloadedQuery<useCampaignPageCampaignQuery>(
    campaignQuery,
    campaignQueryRef
  );

  if (data.campaignForSlug.campaign == null) {
    // TODO[@arcticmatt][campaigns]: handle this better
    return <Page404Content message="This campaign does not exist..." />;
  }

  return (
    <Inner
      campaign={data.campaignForSlug.campaign}
      campaignActivity={campaignActivity}
      setCampaignTab={setCampaignTab}
    />
  );
}
