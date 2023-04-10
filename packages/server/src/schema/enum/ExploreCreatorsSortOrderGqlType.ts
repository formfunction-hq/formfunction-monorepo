import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const ExploreCreatorsSortOrderGqlType = new GraphQLEnumType({
  name: Typename.ExploreCreatorsSortOrder,
  values: {
    Newest: {},
    Oldest: {},
  },
});

export default ExploreCreatorsSortOrderGqlType;
