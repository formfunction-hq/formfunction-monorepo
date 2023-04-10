import ExploreTab from "types/enums/ExploreTab";
import ExploreUrlParamKey from "types/enums/ExploreUrlParamKey";
import getParamStringForUrl from "formfn-shared/dist/utils/getParamStringForUrl";

export default function getExploreLinkRelative(
  tab: ExploreTab,
  params?: { [K in Exclude<ExploreUrlParamKey, "tab">]?: string }
): string {
  return `/explore${getParamStringForUrl({
    [ExploreUrlParamKey.Tab]: tab,
    ...(params ?? {}),
  })}`;
}
