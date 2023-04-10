import graphql from "babel-plugin-relay/macro";
import CampaignGridFullWidth from "components/campaign/CampaignGridFullWidth";
import ExploreCampaignCardForCampaignV2 from "components/pages/explore/ExploreCampaignCardForCampaignV2";
import ExploreCampaignCardSkeleton from "components/pages/explore/skeletons/ExploreCampaignCardSkeleton";
import { ExploreCampaignsGridPaginationQuery } from "components/pages/explore/__generated__/ExploreCampaignsGridPaginationQuery.graphql";
import { ExploreCampaignsGridQuery } from "components/pages/explore/__generated__/ExploreCampaignsGridQuery.graphql";
import { ExploreCampaignsGrid_Query$key } from "components/pages/explore/__generated__/ExploreCampaignsGrid_Query.graphql";
import { EXPLORE_CAMPAIGNS_PAGE_SIZE } from "constants/PageSizes";
import { range } from "formfn-shared/dist/utils/range";
import useCampaignGridFullWidthColumnCount from "hooks/grids/useCampaignGridFullWidthColumnCount";
import useExploreContext from "hooks/useExploreContext";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";

const query = graphql`
  query ExploreCampaignsGridQuery(
    $after: String
    $first: PaginationAmount!
    $input: CampaignsForExploreInput!
  ) {
    ...ExploreCampaignsGrid_Query
  }
`;

const fragment = graphql`
  fragment ExploreCampaignsGrid_Query on query_root
  @refetchable(queryName: "ExploreCampaignsGridPaginationQuery") {
    CampaignsNamespace {
      campaignsForExplore(input: $input) {
        campaigns(after: $after, first: $first, input: $input)
          @connection(key: "ExploreCampaignsGrid_Query_campaigns") {
          edges {
            node {
              id
              ...ExploreCampaignCardForCampaignV2_CampaignV2
            }
          }
        }
      }
    }
  }
`;

function Inner({ gridQuery }: { gridQuery: ExploreCampaignsGrid_Query$key }) {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment<
    ExploreCampaignsGridPaginationQuery,
    ExploreCampaignsGrid_Query$key
  >(fragment, gridQuery);
  const columnsPerRow = useCampaignGridFullWidthColumnCount();

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    EXPLORE_CAMPAIGNS_PAGE_SIZE
  );
  const campaigns =
    data.CampaignsNamespace.campaignsForExplore.campaigns?.edges ?? [];

  return (
    <CampaignGridFullWidth>
      {campaigns.map(({ node }) => (
        <ExploreCampaignCardForCampaignV2 campaign={node} key={node.id} />
      ))}
      {isLoadingNext &&
        range(columnsPerRow * 3).map((val) => (
          <ExploreCampaignCardSkeleton key={val} showNftAssets={false} />
        ))}
    </CampaignGridFullWidth>
  );
}

export default function ExploreCampaignsGrid() {
  const {
    campaigns: { sortOrder, categories },
  } = useExploreContext();
  const data = useLazyLoadQuery<ExploreCampaignsGridQuery>(query, {
    first: EXPLORE_CAMPAIGNS_PAGE_SIZE,
    input: { categories, sortOrder },
  });

  return <Inner gridQuery={data} />;
}
