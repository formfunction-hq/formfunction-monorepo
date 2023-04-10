import useListenForParamChange from "hooks/useListenForParamChange";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityTab from "types/enums/ActivityTab";
import ExploreUrlParamKey from "types/enums/ExploreUrlParamKey";
import getUrlParam from "utils/getUrlParam";
import getUrlWithParam from "utils/getUrlWithParam";

function getIsValidTab(tabParam: string) {
  return tabParam in ActivityTab;
}

export default function useActivityTab(): [
  ActivityTab,
  Dispatch<SetStateAction<ActivityTab>>
] {
  const navigate = useNavigate();
  const tabParam = getUrlParam(ExploreUrlParamKey.Tab) || "";
  const [tab, setTab] = useState<ActivityTab>(
    getIsValidTab(tabParam)
      ? (tabParam as ActivityTab)
      : ActivityTab.Notifications
  );

  useListenForParamChange({
    defaultValue: ActivityTab.Notifications,
    onChange: setTab,
    paramKey: ExploreUrlParamKey.Tab,
    validValues: Object.values(ActivityTab),
  });

  return [
    tab,
    (val) => {
      navigate(getUrlWithParam(ExploreUrlParamKey.Tab, val as string));
    },
  ];
}
