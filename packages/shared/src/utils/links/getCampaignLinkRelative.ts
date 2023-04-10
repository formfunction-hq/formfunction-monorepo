import CampaignUrlParamKey from "types/enums/CampaignUrlParamKey";
import getParamStringForUrl from "utils/getParamStringForUrl";

export default function getCampaignLinkRelative(
  username: string,
  campaignSlug: string,
  params?: Partial<Record<CampaignUrlParamKey, string>>
): string {
  return `/@${username}/campaigns/${campaignSlug}${getParamStringForUrl(
    params
  )}`;
}
