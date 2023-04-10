import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with ReactionType DB enum
const ReactionTypeGqlType = new GraphQLEnumType({
  name: Typename.ReactionType,
  values: {
    Like: {},
  },
});

export default ReactionTypeGqlType;
