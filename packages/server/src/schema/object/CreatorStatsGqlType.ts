import { GraphQLInt, GraphQLObjectType } from "graphql";
import UserGqlType from "src/schema/object/UserGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreatorStatsGqlType = new GraphQLObjectType({
  fields: {
    creator: { type: gqlNonNull(UserGqlType) },
    numCollectors: { type: gqlNonNull(GraphQLInt) },
    numPiecesSold: { type: gqlNonNull(GraphQLInt) },
    // TODO: would be nice to migrate to totalSalesInLamports field
    totalSalesInSol: {
      description:
        "Total sales volume including primary and secondary sales. " +
        "Despite the name, this is actually denominated in lamports, " +
        "the 'sol' part of the name refers to the currency",
      type: gqlNonNull(BigintScalarGqlType),
    },
  },
  name: Typename.CreatorStats,
});

export default CreatorStatsGqlType;
