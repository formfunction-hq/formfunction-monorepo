import { GraphQLObjectType } from "graphql";
import UserGqlType from "src/schema/object/UserGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const HolderGqlType = new GraphQLObjectType({
  fields: {
    user: { type: gqlNonNull(UserGqlType) },
  },
  name: Typename.Holder,
});

export default HolderGqlType;
