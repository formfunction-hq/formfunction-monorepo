import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import { ExploreArtworkGridPaginationQuery } from "components/pages/explore/__generated__/ExploreArtworkGridPaginationQuery.graphql";
import { ExploreArtworkGridQuery } from "components/pages/explore/__generated__/ExploreArtworkGridQuery.graphql";
import { ExploreArtworkGrid_Query$key } from "components/pages/explore/__generated__/ExploreArtworkGrid_Query.graphql";
import { EXPLORE_ARTWORK_PAGE_SIZE } from "constants/PageSizes";
import useExploreContext from "hooks/useExploreContext";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import ExploreMarket from "types/enums/ExploreMarket";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import { range } from "formfn-shared/dist/utils/range";
import ListingCardLoadingSkeleton from "components/auction/ListingCardLoadingSkeleton";
import getNftKindQueryValuesForTab from "utils/explore/getNftKindQueryValuesForTab";
import ExploreTab from "types/enums/ExploreTab";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import logError from "utils/analytics/logError";
import maybeNumber from "utils/maybeNumber";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";
import { useEffect } from "react";

const query = graphql`
  query ExploreArtworkGridQuery(
    $after: String
    $first: Int!
    $input: MetadataAccountsForExploreInput!
  ) {
    ...ExploreArtworkGrid_Query
  }
`;

const fragment = graphql`
  fragment ExploreArtworkGrid_Query on query_root
  @refetchable(queryName: "ExploreArtworkGridPaginationQuery") {
    metadataAccountsForExplore {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(key: "ExploreArtworkGrid_Query_metadataAccounts") {
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

function Inner({ gridQuery }: { gridQuery: ExploreArtworkGrid_Query$key }) {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment<
    ExploreArtworkGridPaginationQuery,
    ExploreArtworkGrid_Query$key
  >(fragment, gridQuery);
  const loadNextCount = Math.max(EXPLORE_ARTWORK_PAGE_SIZE, 24);

  useEffect(() => {
    // Kick off the first loadNext call right away to make the first scroll down smoother
    loadNext(loadNextCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useLoadNextOnBottomScroll(hasNext && !isLoadingNext, loadNext, loadNextCount);

  // TODO[@arcticmatt]: remove this after figuring out root cause
  if (data?.metadataAccountsForExplore?.metadataAccounts == null) {
    logError(
      AnalyticsEvent.RelayUnexpectedUndefined,
      "Unexpected undefined in ExploreArtworkGrid",
      {
        data,
      }
    );
    return null;
  }

  return (
    <NftGridFullWidth>
      {data.metadataAccountsForExplore.metadataAccounts.edges.map(
        ({ node: metadataAccount }) => (
          <ListingCardForMetadata
            key={metadataAccount.id}
            metadataAccount={metadataAccount}
          />
        )
      )}
      {isLoadingNext &&
        range(loadNextCount).map((val) => (
          <ListingCardLoadingSkeleton key={val} />
        ))}
    </NftGridFullWidth>
  );
}

export default function ExploreArtworkGrid(): Maybe<JSX.Element> {
  const {
    availabilitySet,
    currencyConfig,
    currencyNameFromUrlParam,
    decimalsFromUrlParam,
    hasPnft,
    hasUnlockable,
    highPrice,
    lowPrice,
    primaryMarket,
    secondaryMarket,
    sortOrderForArtwork,
    sortOrderForEditions,
    tab,
  } = useExploreContext();
  const decimals =
    currencyConfig?.decimals ?? maybeNumber(decimalsFromUrlParam);
  const currencyName = currencyConfig?.name ?? currencyNameFromUrlParam;

  const data = useLazyLoadQuery<ExploreArtworkGridQuery>(query, {
    first: EXPLORE_ARTWORK_PAGE_SIZE,
    input: {
      availabilitySet: Array.from(availabilitySet),
      currencyNames: currencyName != null ? [currencyName] : [],
      extras: filterNulls([
        hasPnft ? "HasPnft" : null,
        hasUnlockable ? "HasUnlockable" : null,
      ]),
      highPriceLamports:
        decimals != null && highPrice != null
          ? convertToFullDecimals(highPrice, decimals)
          : null,
      lowPriceLamports:
        decimals != null && lowPrice != null
          ? convertToFullDecimals(lowPrice, decimals)
          : null,
      market: filterNulls([
        primaryMarket ? ExploreMarket.Primary : null,
        secondaryMarket ? ExploreMarket.Secondary : null,
      ]),
      nftKind: getNftKindQueryValuesForTab(tab),
      sortOrder:
        tab === ExploreTab.Editions
          ? sortOrderForEditions
          : sortOrderForArtwork,
    },
  });

  return <Inner gridQuery={data} />;
}
