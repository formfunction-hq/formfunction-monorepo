import { GraphQLBoolean, GraphQLInputObjectType } from "graphql";
import PollOptionInputGqlType from "src/schema/input/posts/PollOptionInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const PollInputGqlType = new GraphQLInputObjectType({
  fields: {
    isMultiSelect: { type: gqlNonNull(GraphQLBoolean) },
    pollOptions: { type: gqlNonNullListOfNonNull(PollOptionInputGqlType) },
  },
  name: Typename.PollInput,
});

export default PollInputGqlType;
