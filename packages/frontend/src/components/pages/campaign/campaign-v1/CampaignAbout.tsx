import graphql from "babel-plugin-relay/macro";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { campaignQuery } from "hooks/campaign-page/v1/useCampaignPageCampaign";
import { useCampaignPageCampaignQuery } from "hooks/campaign-page/v1/__generated__/useCampaignPageCampaignQuery.graphql";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import { CampaignAbout_CampaignExpress$key } from "components/pages/campaign/campaign-v1/__generated__/CampaignAbout_CampaignExpress.graphql";
import AboutCard from "components/cards/AboutCard";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import useIsPopheadzCampaign from "hooks/useIsPopheadzCampaign";
import useColorModeContext from "hooks/useColorModeContext";

const campaignFragment = graphql`
  fragment CampaignAbout_CampaignExpress on CampaignExpress {
    about
  }
`;

type InnerProps = {
  campaign: CampaignAbout_CampaignExpress$key;
};

function Inner({ campaign }: InnerProps) {
  const campaignData = useFragment(campaignFragment, campaign);
  const isPopheadz = useIsPopheadzCampaign();
  const { isLightMode } = useColorModeContext();

  return (
    <AboutCard
      backgroundColorClass={
        isPopheadz && isLightMode
          ? BackgroundColorClass.PopheadzLightGray
          : undefined
      }
      description={campaignData.about}
      title="About this Project"
    />
  );
}

type Props = {
  campaignQueryRef: PreloadedQuery<useCampaignPageCampaignQuery>;
};

export default function CampaignAbout({
  campaignQueryRef,
}: Props): Maybe<JSX.Element> {
  const data = usePreloadedQuery<useCampaignPageCampaignQuery>(
    campaignQuery,
    campaignQueryRef
  );

  if (data.campaignForSlug.campaign == null) {
    return null;
  }

  return <Inner campaign={data.campaignForSlug.campaign} />;
}
