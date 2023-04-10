import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PollOptionGqlType = new GraphQLObjectType({
  fields: {
    id: { type: gqlNonNull(GraphQLString) },
    responseCount: { type: gqlNonNull(GraphQLInt) },
    responsePercentage: { type: GraphQLFloat },
    text: { type: gqlNonNull(GraphQLString) },
    viewerRespondedToPoll: { type: gqlNonNull(GraphQLBoolean) },
    viewerRespondedToPollOption: { type: GraphQLBoolean },
  },
  name: Typename.PollOption,
});

export default PollOptionGqlType;
