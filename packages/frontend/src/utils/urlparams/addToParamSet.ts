import { NavigateFunction } from "react-router-dom";
import ExploreUrlParamKey from "types/enums/ExploreUrlParamKey";
import getUrlWithParam from "utils/getUrlWithParam";

export default function addToParamSet<T>(
  navigate: NavigateFunction,
  val: T,
  paramSet: Set<T>,
  urlParamKey: ExploreUrlParamKey
) {
  navigate(
    getUrlWithParam(urlParamKey, [...Array.from(paramSet), val].join(","))
  );
}
