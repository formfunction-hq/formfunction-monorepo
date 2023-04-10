import graphql from "babel-plugin-relay/macro";
import { GENERATIVE_SERIES_PAGE_NFTS_PAGE_SIZE } from "constants/PageSizes";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import flat from "formfn-shared/dist/utils/array/flat";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import { useGenerativeSeriesPageMetadataAccountsQuery } from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageMetadataAccountsQuery.graphql";
import useGenerativeSeriesContext from "hooks/useGenerativeSeriesContext";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import { MetadataAccountsForExploreInput } from "types/relay/__generated__/ExploreExtraPaginationQuery.graphql";
import getContentTypesForContentTypeForFilters from "utils/content-types/getContentTypesForContentTypeForFilters";
import maybeNumber from "utils/maybeNumber";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const generativeSeriesMetadataAccountsQuery = graphql`
  query useGenerativeSeriesPageMetadataAccountsQuery(
    $after: String
    $first: Int!
    $input: MetadataAccountsForExploreInput!
  ) {
    ...GenerativeSeriesPageContent_Query
    ...CampaignTooniesSwapContent_Query
  }
`;

export default function useGenerativeSeriesPageMetadataAccounts(
  userId: MaybeUndef<string>,
  username: MaybeUndef<string>,
  seriesSlug: string,
  ownerId?: string
) {
  const {
    availabilitySet,
    contentTypeSet,
    currencyConfig,
    currencyNameFromUrlParam,
    decimalsFromUrlParam,
    highPrice,
    lowPrice,
    selectedTraits,
    sortOrder,
  } = useGenerativeSeriesContext();
  const decimals =
    currencyConfig?.decimals ?? maybeNumber(decimalsFromUrlParam);
  const currencyName = currencyConfig?.name ?? currencyNameFromUrlParam;

  const input: MetadataAccountsForExploreInput = useMemo(
    () => ({
      attributes: selectedTraits.map((trait) => ({
        traitType: trait.traitName,
        value: trait.traitValue,
      })),
      availabilitySet: Array.from(availabilitySet),
      contentTypes: flat(
        Array.from(contentTypeSet).map((contentType) =>
          getContentTypesForContentTypeForFilters(contentType)
        )
      ),
      currencyNames: currencyName != null ? [currencyName] : [],
      highPriceLamports:
        decimals != null && highPrice != null
          ? convertToFullDecimals(highPrice, decimals)
          : null,
      lowPriceLamports:
        decimals != null && lowPrice != null
          ? convertToFullDecimals(lowPrice, decimals)
          : null,
      market: [],
      nftKind: [NftKind.OneOfOne],
      ownerId,
      series: {
        // If username is populated, we don't care about creatorId
        creatorId: !isEmptyString(username) ? undefined : userId ?? "",
        creatorUsername: username,
        seriesSlug,
      },
      sortOrder,
    }),
    [
      availabilitySet,
      contentTypeSet,
      currencyName,
      decimals,
      highPrice,
      lowPrice,
      ownerId,
      selectedTraits,
      seriesSlug,
      sortOrder,
      userId,
      username,
    ]
  );

  const initialQueryRef = useMemo(
    () =>
      loadQuery<useGenerativeSeriesPageMetadataAccountsQuery>(
        RelayEnvironment,
        generativeSeriesMetadataAccountsQuery,
        {
          after: null,
          first: GENERATIVE_SERIES_PAGE_NFTS_PAGE_SIZE,
          input,
        },
        {
          fetchPolicy: "network-only",
        }
      ),
    [input]
  );

  const [metadataAccountsQueryRef, loadMetadataAccountsQuery] =
    useQueryLoader<useGenerativeSeriesPageMetadataAccountsQuery>(
      generativeSeriesMetadataAccountsQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadMetadataAccountsQuery({
      first: GENERATIVE_SERIES_PAGE_NFTS_PAGE_SIZE,
      input,
    });
  }, [input, loadMetadataAccountsQuery]);

  return metadataAccountsQueryRef;
}
