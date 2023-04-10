import { Dispatch, SetStateAction, useState } from "react";
import getUrlWithParam from "utils/getUrlWithParam";
import { useNavigate } from "react-router-dom";
import useListenForParamChange from "hooks/useListenForParamChange";
import StatsTabType from "types/enums/StatsTabType";
import getUrlParam from "utils/getUrlParam";

const URL_PARAM_KEY = "tab";

export default function useStatsTab(): [
  StatsTabType,
  Dispatch<SetStateAction<StatsTabType>>
] {
  const navigate = useNavigate();
  const initialTab = getUrlParam(URL_PARAM_KEY) || "";
  const [tab, setTab] = useState<StatsTabType>(
    Object.values(StatsTabType).includes(initialTab as any)
      ? (initialTab as StatsTabType)
      : StatsTabType.Creators
  );

  useListenForParamChange({
    defaultValue: StatsTabType.Creators,
    onChange: setTab,
    paramKey: URL_PARAM_KEY,
    validValues: Object.values(StatsTabType),
  });

  return [
    tab,
    (val) => {
      navigate(getUrlWithParam(URL_PARAM_KEY, val as string));
    },
  ];
}
