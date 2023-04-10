import { GraphQLString, GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const SocialNetworkGqlType = new GraphQLObjectType({
  fields: {
    authLink: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.SocialNetwork,
});

export default SocialNetworkGqlType;
