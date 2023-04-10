import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import { TagGridPaginationQuery } from "components/pages/tags/tag/__generated__/TagGridPaginationQuery.graphql";
import { TagGridQuery } from "components/pages/tags/tag/__generated__/TagGridQuery.graphql";
import { TagGrid_Query$key } from "components/pages/tags/tag/__generated__/TagGrid_Query.graphql";
import useExploreContext from "hooks/useExploreContext";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import ExploreMarket from "types/enums/ExploreMarket";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import maybeNumber from "utils/maybeNumber";

const query = graphql`
  query TagGridQuery(
    $after: String
    $first: Int!
    $input: MetadataAccountsForExploreInput!
  ) {
    ...TagGrid_Query
  }
`;

const fragment = graphql`
  fragment TagGrid_Query on query_root
  @refetchable(queryName: "TagGridPaginationQuery") {
    metadataAccountsForExplore {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(key: "TagGrid_Query_metadataAccounts") {
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

function Inner({ gridQuery }: { gridQuery: TagGrid_Query$key }) {
  // TODO: call loadNext when you scroll to bottom
  const { data } = usePaginationFragment<
    TagGridPaginationQuery,
    TagGrid_Query$key
  >(fragment, gridQuery);

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
    </NftGridFullWidth>
  );
}

type Props = {
  tag: string;
};

export default function TagGrid({ tag }: Props): JSX.Element {
  const {
    availabilitySet,
    currencyConfig,
    currencyNameFromUrlParam,
    decimalsFromUrlParam,
    highPrice,
    lowPrice,
    primaryMarket,
    secondaryMarket,
    sortOrderForArtwork,
  } = useExploreContext();
  const decimals =
    currencyConfig?.decimals ?? maybeNumber(decimalsFromUrlParam);
  const currencyName = currencyConfig?.name ?? currencyNameFromUrlParam;

  const data = useLazyLoadQuery<TagGridQuery>(query, {
    first: 100,
    input: {
      availabilitySet: Array.from(availabilitySet),
      currencyNames: currencyName != null ? [currencyName] : [],
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
      // TODO[editions]: replace with actual params
      nftKind: [],
      sortOrder: sortOrderForArtwork,
      tag,
    },
  });

  return <Inner gridQuery={data} />;
}
