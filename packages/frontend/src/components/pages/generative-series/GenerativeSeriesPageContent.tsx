import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import NftGridDense from "components/grids/nft/NftGridDense";
import {
  GenerativeSeriesPageContentPaginationQuery,
  GenerativeSeriesPageContentPaginationQuery$data,
} from "components/pages/generative-series/__generated__/GenerativeSeriesPageContentPaginationQuery.graphql";
import { GenerativeSeriesPageContent_Query$key } from "components/pages/generative-series/__generated__/GenerativeSeriesPageContent_Query.graphql";
import { generativeSeriesMetadataAccountsQuery } from "hooks/generative-series-page/useGenerativeSeriesPageMetadataAccounts";
import { useGenerativeSeriesPageMetadataAccountsQuery } from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageMetadataAccountsQuery.graphql";
import {
  PreloadedQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import styles from "css/pages/generative-series/GenerativeSeriesPageContent.module.css";
import useBreakpoint from "hooks/useBreakpoint";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";
import GenerativeSeriesFilters from "components/pages/generative-series/GenerativeSeriesFilters";
import { Suspense } from "react";
import NftGridDenseLoading from "components/grids/nft/NftGridDenseLoading";
import { GENERATIVE_SERIES_PAGE_NFTS_PAGE_SIZE } from "constants/PageSizes";
import FiltersButtonForGenerativeSeries from "components/buttons/FiltersButtonForGenerativeSeries";
import SortButtonForGenerativeSeries from "components/buttons/SortButtonForGenerativeSeries";
import { useGenerativeSeriesPageAttributesQuery } from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageAttributesQuery.graphql";
import { GenerativeSeriesPageContent_Series$key } from "components/pages/generative-series/__generated__/GenerativeSeriesPageContent_Series.graphql";
import Subheader from "components/text/Subheader";
import ColorClass from "types/enums/ColorClass";
import Header2 from "components/text/Header2";
import AssetForAsset from "components/assets/AssetForAsset";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";
import { range } from "formfn-shared/dist/utils/range";
import ListingCardLoadingSkeleton from "components/auction/ListingCardLoadingSkeleton";
import ReactMarkdownLazy from "components/markdown/ReactMarkdownLazy";

const nftsFragment = graphql`
  fragment GenerativeSeriesPageContent_Query on query_root
  @refetchable(queryName: "GenerativeSeriesPageContentPaginationQuery") {
    metadataAccountsForExplore {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(key: "GenerativeSeriesPageContent_Query_metadataAccounts") {
        edges {
          node {
            id

            ...ListingCardForMetadata_MetadataAccount
          }
        }
      }
    }
  }
`;

const seriesFragment = graphql`
  fragment GenerativeSeriesPageContent_Series on Series {
    id
    description
    name

    logoAsset {
      ...AssetForAsset_Asset
    }
  }
`;

function Grid({
  metadataAccounts,
}: {
  metadataAccounts: GenerativeSeriesPageContentPaginationQuery$data;
}) {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment<
    GenerativeSeriesPageContentPaginationQuery,
    GenerativeSeriesPageContent_Query$key
  >(nftsFragment, metadataAccounts);
  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    GENERATIVE_SERIES_PAGE_NFTS_PAGE_SIZE
  );

  return (
    <NftGridDense>
      {data.metadataAccountsForExplore.metadataAccounts.edges.map(
        ({ node: metadataAccount }) => (
          <ListingCardForMetadata
            key={metadataAccount.id}
            metadataAccount={metadataAccount}
          />
        )
      )}
      {isLoadingNext &&
        range(GENERATIVE_SERIES_PAGE_NFTS_PAGE_SIZE).map((val) => (
          <ListingCardLoadingSkeleton key={val} />
        ))}
    </NftGridDense>
  );
}

function GridDataLoader({
  metadataAccountsQueryRef,
}: {
  metadataAccountsQueryRef: PreloadedQuery<useGenerativeSeriesPageMetadataAccountsQuery>;
}) {
  const data = usePreloadedQuery<useGenerativeSeriesPageMetadataAccountsQuery>(
    generativeSeriesMetadataAccountsQuery,
    metadataAccountsQueryRef
  );

  return <Grid metadataAccounts={data} />;
}

type Props = {
  attributesQueryRef: PreloadedQuery<useGenerativeSeriesPageAttributesQuery>;
  metadataAccountsQueryRef: PreloadedQuery<useGenerativeSeriesPageMetadataAccountsQuery>;
  series: GenerativeSeriesPageContent_Series$key;
};

export default function GenerativeSeriesPageContent({
  attributesQueryRef,
  metadataAccountsQueryRef,
  series,
}: Props) {
  const { isFiltersSidebarBreakpoint } = useBreakpoint();
  const showFiltersSidebar = !isFiltersSidebarBreakpoint;
  const seriesData = useFragment(seriesFragment, series);

  const gridAndFilters = (
    <div className={styles.gridAndFilters}>
      {showFiltersSidebar && (
        <div className={joinClasses(styles.filters, GlobalClass.HideScrollbar)}>
          <GenerativeSeriesFilters attributesQueryRef={attributesQueryRef} />
        </div>
      )}
      <div className={styles.gridContainer}>
        <Suspense
          fallback={
            <NftGridDenseLoading
              count={GENERATIVE_SERIES_PAGE_NFTS_PAGE_SIZE}
            />
          }
        >
          <GridDataLoader metadataAccountsQueryRef={metadataAccountsQueryRef} />
        </Suspense>
      </div>
    </div>
  );

  return (
    <div>
      <div className={styles.titleAndDescription}>
        {seriesData.logoAsset == null ? (
          <Header2 colorClass={ColorClass.Primary} textAlign="center">
            {seriesData.name}
          </Header2>
        ) : (
          <AssetForAsset
            asset={seriesData.logoAsset}
            // TODO[@arcticmatt]: may need to adjust image sizing, this just makes it look good for popheadz
            height={121}
            objectFit="cover"
            showDropShadow={false}
            showShimmer={false}
            width="auto"
          />
        )}
        <Subheader colorClass={ColorClass.Primary} textAlign="center">
          <ReactMarkdownLazy>{seriesData.description}</ReactMarkdownLazy>
        </Subheader>
      </div>
      <div className={styles.filterAndSortButton}>
        {!showFiltersSidebar && (
          <FiltersButtonForGenerativeSeries
            attributesQueryRef={attributesQueryRef}
          />
        )}
        <SortButtonForGenerativeSeries />
      </div>
      <div className={styles.separator} />
      {gridAndFilters}
    </div>
  );
}
