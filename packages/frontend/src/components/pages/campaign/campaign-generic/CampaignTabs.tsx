import TabButton from "components/buttons/TabButton";
import CampaignCommunityTabButton from "components/pages/campaign/campaign-generic/CampaignCommunityTabButton";
import styles from "css/pages/campaign/campaign-v1/CampaignTabs.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useCampaignPageCampaignV2Query } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2Query.graphql";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import { useEffect } from "react";
import { PreloadedQuery } from "react-relay";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import CampaignUrlParamKey from "formfn-shared/dist/types/enums/CampaignUrlParamKey";
import ElementId from "types/enums/ElementId";
import PopheadzCampaignTab from "types/enums/PopheadzCampaignTab";
import getUrlParam from "utils/getUrlParam";
import scrollElementIntoView from "utils/scroll/scrollElementIntoView";
import HUMAN_READABLE_CAMPAIGN_TAB from "constants/HumanReadableCampaignTab";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";
import TooniesCampaignTab from "types/enums/TooniesCampaignTab";
import useIsPopheadzCampaign from "hooks/useIsPopheadzCampaign";
import useIsTooniesCampaign from "hooks/useIsTooniesCampaign";
import CampaignTabType from "types/CampaignTabType";

type Props = {
  campaignQueryRef: Maybe<PreloadedQuery<useCampaignPageCampaignV2Query>>;
  campaignTab: CampaignTabType;
  setCampaignTab: (val: CampaignTabType) => void;
};

export default function CampaignTabs({
  campaignQueryRef,
  campaignTab,
  setCampaignTab,
}: Props) {
  const colorScheme = useCampaignColorScheme();
  const scrollToContentParam = getUrlParam(CampaignUrlParamKey.ScrollToContent);
  const isPopheadz = useIsPopheadzCampaign();
  const isToonies = useIsTooniesCampaign();

  // If `scrollToContent` param is set, scroll to this element to show
  // campaign tabs content (only upon first render)
  useEffect(() => {
    if (scrollToContentParam != null) {
      scrollElementIntoView(ElementId.CampaignTabs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const popheadzTabs = (
    <TabButton
      activeColorClass={colorScheme.foreground.colorClass}
      isActive={campaignTab === PopheadzCampaignTab.Team}
      name="Team"
      onClick={() => setCampaignTab(PopheadzCampaignTab.Team)}
    />
  );

  const tooniesTabs = (
    <TabButton
      activeColorClass={colorScheme.foreground.colorClass}
      isActive={campaignTab === TooniesCampaignTab.TooniesSwap}
      name={TooniesCampaignTab.TooniesSwap}
      onClick={() => setCampaignTab(TooniesCampaignTab.TooniesSwap)}
    />
  );

  return (
    <div
      className={joinClasses(styles.container, GlobalClass.HideScrollbar)}
      id={ElementId.CampaignTabs}
    >
      <TabButton
        activeColorClass={colorScheme.foreground.colorClass}
        isActive={campaignTab === CampaignTab.Support}
        name={HUMAN_READABLE_CAMPAIGN_TAB[CampaignTab.Support]}
        onClick={() => setCampaignTab(CampaignTab.Support)}
      />
      <TabButton
        activeColorClass={colorScheme.foreground.colorClass}
        isActive={campaignTab === CampaignTab.About}
        name={HUMAN_READABLE_CAMPAIGN_TAB[CampaignTab.About]}
        onClick={() => setCampaignTab(CampaignTab.About)}
      />
      {campaignQueryRef && (
        <CampaignCommunityTabButton
          campaignQueryRef={campaignQueryRef}
          campaignTab={campaignTab}
          setCampaignTab={setCampaignTab}
        />
      )}
      {isPopheadz && popheadzTabs}
      {isToonies && tooniesTabs}
    </div>
  );
}
