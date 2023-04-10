import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from "graphql";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import NftAssetGqlType from "src/schema/object/NftAssetGqlType";
import PriceGqlType from "src/schema/object/PriceGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const FlashbackArtistStatsGqlType = new GraphQLObjectType({
  fields: {
    numEditionsSold: { type: gqlNonNull(GraphQLInt) },
    numOneOfOnesSold: { type: gqlNonNull(GraphQLInt) },
    numPrimarySales: { type: gqlNonNull(GraphQLInt) },
    numSalesRank: {
      description: "Null if not in the top 100. 1-indexed",
      type: GraphQLInt,
    },
    numSecondarySales: { type: gqlNonNull(GraphQLInt) },
    numUniqueCollectors: { type: gqlNonNull(GraphQLInt) },
    soldNftAssets: { type: gqlNonNullListOfNonNull(NftAssetGqlType) },
    topSellingPiece: { type: MetadataAccountGqlType },
    topSellingPiecePrice: { type: PriceGqlType },
    totalIncomeInLamports: { type: gqlNonNull(BigintScalarGqlType) },
    totalIncomeInUsd: { type: gqlNonNull(GraphQLFloat) },
    totalVolumeInLamports: { type: gqlNonNull(BigintScalarGqlType) },
    totalVolumeInUsd: { type: gqlNonNull(GraphQLFloat) },
    uniqueCollectorsSample: { type: gqlNonNullListOfNonNull(UserGqlType) },
    volumeRank: {
      description: "Null if not in the top 100. 1-indexed",
      type: GraphQLInt,
    },
  },
  name: Typename.FlashbackArtistStats,
});

export default FlashbackArtistStatsGqlType;
