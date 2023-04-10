import { GraphQLInt, GraphQLObjectType } from "graphql";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import NftAssetGqlType from "src/schema/object/NftAssetGqlType";
import PriceGqlType from "src/schema/object/PriceGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const FlashbackCollectorStatsGqlType = new GraphQLObjectType({
  fields: {
    artistsSupportedSample: { type: gqlNonNullListOfNonNull(UserGqlType) },
    biggestSecondarySale: { type: MetadataAccountGqlType },
    biggestSecondarySalePrice: { type: PriceGqlType },
    boughtNftAssets: { type: gqlNonNullListOfNonNull(NftAssetGqlType) },
    firstArtistSupported: { type: UserGqlType },
    firstEditionBought: { type: MetadataAccountGqlType },
    firstOneOfOneBought: { type: MetadataAccountGqlType },
    numArtistsSupported: { type: gqlNonNull(GraphQLInt) },
    numBuysRank: {
      description: "Null if not in the top 100. 1-indexed",
      type: GraphQLInt,
    },
    numEditionsBought: { type: gqlNonNull(GraphQLInt) },
    numOneOfOnesBought: { type: gqlNonNull(GraphQLInt) },
    numPrimaryBuys: { type: gqlNonNull(GraphQLInt) },
    numSecondaryBuys: { type: gqlNonNull(GraphQLInt) },
    numSecondarySales: { type: gqlNonNull(GraphQLInt) },
    totalVolumeSpentInLamports: { type: gqlNonNull(BigintScalarGqlType) },
    volumeRank: {
      description: "Null if not in the top 100. 1-indexed",
      type: GraphQLInt,
    },
  },
  name: Typename.FlashbackCollectorStats,
});

export default FlashbackCollectorStatsGqlType;
