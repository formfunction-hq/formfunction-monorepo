import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import getLinkForEnvironment from "src/utils/getLinkForEnvironment";
import { SeriesTypeExpress_Enum } from "src/__generated__/generated";

export default function getSeriesLink(
  username: string,
  slug: string,
  seriesType: SeriesTypeExpress_Enum
) {
  const relativeLink = getSeriesLinkRelative(username, slug, seriesType);
  return getLinkForEnvironment(relativeLink);
}
