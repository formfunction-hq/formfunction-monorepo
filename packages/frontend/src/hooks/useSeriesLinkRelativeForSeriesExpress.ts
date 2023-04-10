import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { useSeriesLinkRelativeForSeriesExpress_SeriesExpress$key } from "hooks/__generated__/useSeriesLinkRelativeForSeriesExpress_SeriesExpress.graphql";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";

const fragment = graphql`
  fragment useSeriesLinkRelativeForSeriesExpress_SeriesExpress on SeriesExpress {
    slug
    type
    Creator {
      username
    }
  }
`;

export default function useSeriesLinkRelativeForSeriesExpress(
  series: useSeriesLinkRelativeForSeriesExpress_SeriesExpress$key
): string {
  const seriesData = useFragment(fragment, series);
  return getSeriesLinkRelative(
    seriesData.Creator.username,
    seriesData.slug,
    seriesData.type
  );
}
