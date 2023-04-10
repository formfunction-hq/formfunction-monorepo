import { GraphQLInputObjectType, GraphQLString, GraphQLBoolean } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const RespondToPollInputGqlType = new GraphQLInputObjectType({
  fields: {
    pollOptionId: { type: gqlNonNull(GraphQLString) },
    responseValue: { type: gqlNonNull(GraphQLBoolean) },
  },
  name: Typename.RespondToPollInput,
});

export default RespondToPollInputGqlType;
