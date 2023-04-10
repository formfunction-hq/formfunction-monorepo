import { GraphQLObjectType } from "graphql";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const DESCRIPTION =
  "If the series contains pieces that have been sold for a variety of currencies, " +
  "all monetary amounts will be converted to lamports.";

const SeriesStatsResponseGqlType = new GraphQLObjectType({
  fields: {
    floorPriceInLamports: {
      description: `${DESCRIPTION} If no pieces in the series are listed, the floor price will be null.`,
      type: BigintScalarGqlType,
    },
    volumeInLamports: {
      description: DESCRIPTION,
      type: gqlNonNull(BigintScalarGqlType),
    },
  },
  name: Typename.SeriesStatsResponse,
});

export default SeriesStatsResponseGqlType;
