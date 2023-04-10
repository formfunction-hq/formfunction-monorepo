import { GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";

const TopCreatorStatsInputGqlType = new GraphQLInputObjectType({
  fields: {
    afterTime: { type: gqlNonNull(TimestamptzScalarGqlType) },
  },
  name: Typename.TopCreatorStatsInput,
});

export default TopCreatorStatsInputGqlType;
