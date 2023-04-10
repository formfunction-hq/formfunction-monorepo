import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import VideoQuality from "types/enums/VideoQuality";
import { useSeriesPageMetadataAccountsQuery } from "hooks/series-page/__generated__/useSeriesPageMetadataAccountsQuery.graphql";
import {
  seriesMetadataAccountsFragment,
  seriesMetadataAccountsQuery,
} from "hooks/series-page/useSeriesPageMetadataAccounts";
import { SeriesPageMetadataAccountsPaginationQuery } from "hooks/series-page/__generated__/SeriesPageMetadataAccountsPaginationQuery.graphql";
import { useSeriesPageMetadataAccounts_Query$key } from "hooks/series-page/__generated__/useSeriesPageMetadataAccounts_Query.graphql";
import { SERIES_PAGE_NFTS_PAGE_SIZE } from "constants/PageSizes";
import { range } from "formfn-shared/dist/utils/range";
import ListingCardLoadingSkeleton from "components/auction/ListingCardLoadingSkeleton";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";

type Props = {
  nftQueryRef: PreloadedQuery<useSeriesPageMetadataAccountsQuery>;
};

export default function SeriesPageNfts({ nftQueryRef }: Props): JSX.Element {
  const metadataAccountsPreloadedQuery =
    usePreloadedQuery<useSeriesPageMetadataAccountsQuery>(
      seriesMetadataAccountsQuery,
      nftQueryRef
    );
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    SeriesPageMetadataAccountsPaginationQuery,
    useSeriesPageMetadataAccounts_Query$key
  >(seriesMetadataAccountsFragment, metadataAccountsPreloadedQuery);
  const nodes = data?.metadataAccountsForSeries?.metadataAccounts.edges.map(
    ({ node }) => node
  );

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    SERIES_PAGE_NFTS_PAGE_SIZE
  );

  return (
    <NftGridFullWidth>
      {nodes &&
        nodes.map((node) => (
          <ListingCardForMetadata
            key={node.id}
            metadataAccount={node}
            desiredVideoQuality={VideoQuality.X2}
          />
        ))}
      {isLoadingNext &&
        range(SERIES_PAGE_NFTS_PAGE_SIZE).map((val) => (
          <ListingCardLoadingSkeleton key={val} />
        ))}
    </NftGridFullWidth>
  );
}
