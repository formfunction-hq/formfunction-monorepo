import { GraphQLInputObjectType } from "graphql";
import ExploreCreatorsSortOrderGqlType from "src/schema/enum/ExploreCreatorsSortOrderGqlType";
import Typename from "src/types/enums/Typename";

const UsersForExploreInputGqlType = new GraphQLInputObjectType({
  fields: {
    orderBy: { type: ExploreCreatorsSortOrderGqlType },
  },
  name: Typename.UsersForExploreInput,
});

export default UsersForExploreInputGqlType;
