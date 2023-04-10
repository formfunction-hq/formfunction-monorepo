import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import ExploreAvailabilityV2GqlType from "src/schema/enum/ExploreAvailabilityV2GqlType";
import ExploreMarketGqlType from "src/schema/enum/ExploreMarketGqlType";
import ExploreSortOrderGqlType from "src/schema/enum/ExploreSortOrderGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import NftKindGqlType from "src/schema/enum/NftKindGqlType";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import ExploreExtraGqlType from "src/schema/enum/ExploreExtraGqlType";
import CurrencyNameGqlType from "src/schema/enum/CurrencyNameGqlType";
import gqlList from "src/utils/graphql/gqlList";
import NftAttributeInputGqlType from "src/schema/input/NftAttributeInputGqlType";
import SERIES_INPUT_FIELDS from "src/constants/graphql/SeriesInputFields";

const MetadataAccountsForExploreSeriesInputGqlType = new GraphQLInputObjectType(
  {
    fields: SERIES_INPUT_FIELDS,
    name: Typename.MetadataAccountsForExploreSeriesInput,
  }
);

const MetadataAccountsForExploreInputGqlType = new GraphQLInputObjectType({
  fields: {
    attributes: {
      description:
        "A list of attributes to filter on (null can be used if no filtering on attributes is needed)",
      type: gqlListOfNonNull(NftAttributeInputGqlType),
    },
    availabilitySet: {
      type: gqlNonNullListOfNonNull(ExploreAvailabilityV2GqlType),
    },
    contentTypes: {
      description:
        "A list of content types to filter on. If empty or null, no filtering will be done.",
      type: gqlListOfNonNull(GraphQLString),
    },
    currencyNames: { type: gqlList(CurrencyNameGqlType) },
    extras: {
      // TODO[@bonham000][Explore]: Change to use gqlNonNullListOfNonNull after some time when
      // all clients have started passing this input up.
      type: gqlListOfNonNull(ExploreExtraGqlType),
    },
    highPriceLamports: { type: BigintScalarGqlType },
    lowPriceLamports: { type: BigintScalarGqlType },
    market: {
      type: gqlNonNullListOfNonNull(ExploreMarketGqlType),
    },
    nftKind: {
      defaultValue: [],
      type: gqlNonNullListOfNonNull(NftKindGqlType),
    },
    ownerId: {
      description:
        "If specified, only NFTs that belong to the specified owner will be returned",
      type: GraphQLID,
    },
    series: {
      description:
        "If specified, only NFTs that belong to the corresponding series will be returned",
      type: MetadataAccountsForExploreSeriesInputGqlType,
    },
    sortOrder: { type: gqlNonNull(ExploreSortOrderGqlType) },
    tag: { type: GraphQLString },
  },
  name: Typename.MetadataAccountsForExploreInput,
});

export default MetadataAccountsForExploreInputGqlType;
