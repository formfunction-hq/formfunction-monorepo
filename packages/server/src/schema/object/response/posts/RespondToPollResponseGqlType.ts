import { GraphQLObjectType } from "graphql";
import PollGqlType from "src/schema/object/posts/PollGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const RespondToPollResponseGqlType = new GraphQLObjectType({
  fields: {
    poll: {
      type: gqlNonNull(PollGqlType),
    },
  },
  name: Typename.RespondToPollResponse,
});

export default RespondToPollResponseGqlType;
