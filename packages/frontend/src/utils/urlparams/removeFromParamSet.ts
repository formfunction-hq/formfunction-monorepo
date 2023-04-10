import { EMPTY_PARAM } from "hooks/useListenForParamChange";
import { NavigateFunction } from "react-router-dom";
import ExploreUrlParamKey from "types/enums/ExploreUrlParamKey";
import getUrlWithParam from "utils/getUrlWithParam";

export default function removeFromParamSet<T extends string>(
  navigate: NavigateFunction,
  val: T,
  paramSet: Set<T>,
  urlParamKey: ExploreUrlParamKey,
  defaultVal?: T
) {
  const newValues = Array.from(paramSet)
    .filter((v) => v !== val)
    .join(",");
  if (newValues !== "") {
    navigate(getUrlWithParam(urlParamKey, newValues));
  } else {
    navigate(getUrlWithParam(urlParamKey, defaultVal ?? EMPTY_PARAM));
  }
}
