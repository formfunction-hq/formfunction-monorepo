import { GraphQLObjectType } from "graphql";
import HolderGqlType from "src/schema/object/holder/HolderGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const HoldersForUserResponseGqlType = new GraphQLObjectType({
  fields: {
    holders: {
      description: "Null if viewer is null",
      type: gqlListOfNonNull(HolderGqlType),
    },
  },
  name: Typename.HoldersForUserResponse,
});

export default HoldersForUserResponseGqlType;
