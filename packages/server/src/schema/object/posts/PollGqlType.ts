import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
} from "graphql";
import PollOptionGqlType from "src/schema/object/posts/PollOptionGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const PollGqlType = new GraphQLObjectType({
  fields: {
    id: { type: gqlNonNull(GraphQLID) },
    isMultiSelect: { type: GraphQLBoolean },
    options: { type: gqlNonNullListOfNonNull(PollOptionGqlType) },
    totalResponses: { type: gqlNonNull(GraphQLInt) },
    viewerRespondedToPoll: { type: gqlNonNull(GraphQLBoolean) },
  },
  name: Typename.Poll,
});

export default PollGqlType;
