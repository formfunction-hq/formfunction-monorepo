import { GraphQLInt, GraphQLObjectType } from "graphql";
import UserGqlType from "src/schema/object/UserGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CollectorStatsGqlType = new GraphQLObjectType({
  fields: {
    collector: { type: gqlNonNull(UserGqlType) },
    numCreatorsSupported: { type: gqlNonNull(GraphQLInt) },
    numPiecesBought: { type: gqlNonNull(GraphQLInt) },
    // TODO: would be nice to migrate to totalPaidInLamports field
    totalPaidInSol: {
      description:
        "Despite the name, this is actually denominated in lamports, " +
        "the 'sol' part of the name refers to the currency",
      type: gqlNonNull(BigintScalarGqlType),
    },
  },
  name: Typename.CollectorStats,
});

export default CollectorStatsGqlType;
