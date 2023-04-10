import ProfileUrlParamKey from "types/enums/ProfileUrlParamKey";
import getParamStringForUrl from "utils/getParamStringForUrl";

export default function getUserProfileLinkRelative(
  username: string,
  params?: Partial<Record<ProfileUrlParamKey, string>>
): string {
  return `/@${username}${getParamStringForUrl(params)}`;
}
