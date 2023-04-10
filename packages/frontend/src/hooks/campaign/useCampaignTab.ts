import useListenForParamChange from "hooks/useListenForParamChange";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import CampaignUrlParamKey from "formfn-shared/dist/types/enums/CampaignUrlParamKey";
import getUrlParam from "utils/getUrlParam";
import getUrlWithParam from "utils/getUrlWithParam";
import graphql from "babel-plugin-relay/macro";
import { useCampaignTab_CampaignV2$key } from "hooks/campaign/__generated__/useCampaignTab_CampaignV2.graphql";
import { useFragment } from "react-relay";
import useCanViewerViewCommunityTab from "hooks/campaign/useCanViewerViewCommunityTab";
import CampaignTabType from "types/CampaignTabType";

function getTabDefault(tabParam: string, canViewCommunityTab: boolean) {
  if (tabParam === CampaignTab.Community && !canViewCommunityTab) {
    return CampaignTab.PublicUpdates;
  }
  if (tabParam === CampaignTab.PublicUpdates && canViewCommunityTab) {
    return CampaignTab.Community;
  }

  return Object.values(CampaignTab).includes(tabParam as CampaignTab)
    ? (tabParam as CampaignTab)
    : CampaignTab.Support;
}

const fragment = graphql`
  fragment useCampaignTab_CampaignV2 on CampaignV2 {
    ...useCanViewerViewCommunityTab_CampaignV2
  }
`;

export default function useCampaignTab(
  campaign: useCampaignTab_CampaignV2$key
): [CampaignTabType, Dispatch<SetStateAction<CampaignTabType>>] {
  const campaignData = useFragment(fragment, campaign);
  const navigate = useNavigate();
  const tabParam = getUrlParam(CampaignUrlParamKey.Tab) || "";
  const canViewCommunityTab = useCanViewerViewCommunityTab(campaignData);

  const defaultTab = getTabDefault(tabParam, canViewCommunityTab);
  const [tab, setTab] = useState<CampaignTabType>(defaultTab);
  if (tabParam !== "" && defaultTab !== tabParam) {
    navigate(getUrlWithParam(CampaignUrlParamKey.Tab, defaultTab, true));
  }

  useListenForParamChange({
    defaultValue: CampaignTab.Support,
    onChange: setTab,
    paramKey: CampaignUrlParamKey.Tab,
    validValues: Object.values(CampaignTab),
  });

  return [
    tab,
    (val) => {
      navigate(getUrlWithParam(CampaignUrlParamKey.Tab, val as string, true));
    },
  ];
}
