import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const HoldersForUserInputGqlType = new GraphQLInputObjectType({
  fields: {
    userId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.HoldersForUserInput,
});

export default HoldersForUserInputGqlType;
