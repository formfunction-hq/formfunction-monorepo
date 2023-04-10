import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const SeriesHoldersForUserInputGqlType = new GraphQLInputObjectType({
  fields: {
    userId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.SeriesHoldersForUserInput,
});

export default SeriesHoldersForUserInputGqlType;
