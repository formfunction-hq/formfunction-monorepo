import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { RedirectLocation_Enum } from "src/__generated__/generated";
import getFrontendUrl from "src/utils/getFrontendUrl";

export default function getRedirectUrlFromRequest(
  redirect: Maybe<RedirectLocation_Enum>,
  query?: Maybe<string>
): string {
  let url = `${getFrontendUrl()}`;

  if (redirect != null) {
    switch (redirect) {
      case RedirectLocation_Enum.Apply:
        url += "/apply";
        break;
      case RedirectLocation_Enum.Profile:
        url += "/profile";
        break;
      case RedirectLocation_Enum.EditProfile:
        url += "/profile/edit";
        break;
      default:
        assertUnreachable(redirect);
    }
  }

  url += query ?? "";
  return url;
}
