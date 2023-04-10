import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PollOptionInputGqlType = new GraphQLInputObjectType({
  fields: {
    text: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.PollOptionInput,
});

export default PollOptionInputGqlType;
