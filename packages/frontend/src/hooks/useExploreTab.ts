import useListenForParamChange from "hooks/useListenForParamChange";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreTab from "types/enums/ExploreTab";
import ExploreUrlParamKey from "types/enums/ExploreUrlParamKey";
import getUrlParam from "utils/getUrlParam";
import getUrlWithParam from "utils/getUrlWithParam";

function getIsValidTab(tabParam: string) {
  return tabParam in ExploreTab;
}

export default function useExploreTab(): [
  ExploreTab,
  Dispatch<SetStateAction<ExploreTab>>
] {
  const navigate = useNavigate();
  const tabParam = getUrlParam(ExploreUrlParamKey.Tab) || "";
  const [tab, setTab] = useState<ExploreTab>(
    getIsValidTab(tabParam) ? (tabParam as ExploreTab) : ExploreTab.Artwork
  );

  useListenForParamChange({
    defaultValue: ExploreTab.Artwork,
    onChange: setTab,
    paramKey: ExploreUrlParamKey.Tab,
    validValues: Object.values(ExploreTab),
  });

  return [
    tab,
    (val) => {
      navigate(getUrlWithParam(ExploreUrlParamKey.Tab, val as string, true));
    },
  ];
}
