import { GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftAttributeGqlType = new GraphQLObjectType({
  fields: {
    traitType: { type: gqlNonNull(GraphQLString) },
    value: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.NftAttribute,
});

export default NftAttributeGqlType;
