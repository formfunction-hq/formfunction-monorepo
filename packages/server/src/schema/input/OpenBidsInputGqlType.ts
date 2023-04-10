import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const OpenBidsInputGqlType = new GraphQLInputObjectType({
  fields: {
    userId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.OpenBidsInput,
});

export default OpenBidsInputGqlType;
