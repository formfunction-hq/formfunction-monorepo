import { GraphQLInt, GraphQLObjectType } from "graphql";
import ReactionTypeGqlType from "src/schema/enum/ReactionTypeGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const ReactionCountGqlType = new GraphQLObjectType({
  fields: {
    count: { type: gqlNonNull(GraphQLInt) },
    type: { type: gqlNonNull(ReactionTypeGqlType) },
  },
  name: Typename.ReactionCount,
});

const ReactionsGqlType = new GraphQLObjectType({
  fields: {
    reactionCounts: { type: gqlNonNullListOfNonNull(ReactionCountGqlType) },
    totalCount: { type: gqlNonNull(GraphQLInt) },
    viewerReactionType: {
      description:
        "Indicates the reaction selected by the current viewer, if any",
      type: ReactionTypeGqlType,
    },
  },
  name: Typename.Reactions,
});

export default ReactionsGqlType;
