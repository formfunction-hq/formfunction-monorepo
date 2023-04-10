import { NavigateFunction } from "react-router-dom";
import ExploreUrlParamKey from "types/enums/ExploreUrlParamKey";
import getUrlWithParam from "utils/getUrlWithParam";

export default function addToParamArray<T>(
  navigate: NavigateFunction,
  val: T,
  paramArray: Array<T>,
  urlParamKey: ExploreUrlParamKey
) {
  navigate(getUrlWithParam(urlParamKey, [...paramArray, val].join(",")));
}
