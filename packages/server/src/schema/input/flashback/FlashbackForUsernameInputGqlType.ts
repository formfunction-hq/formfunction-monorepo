import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const FlashbackForUsernameInputGqlType = new GraphQLInputObjectType({
  fields: {
    // To ensure that only authorized users can access this data.
    check: { type: gqlNonNull(GraphQLString) },
    username: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.FlashbackForUsernameInput,
});

export default FlashbackForUsernameInputGqlType;
