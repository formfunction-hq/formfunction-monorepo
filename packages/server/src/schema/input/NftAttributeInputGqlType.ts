import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftAttributeInputGqlType = new GraphQLInputObjectType({
  fields: {
    traitType: { type: gqlNonNull(GraphQLString) },
    value: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.NftAttributeInput,
});

export default NftAttributeInputGqlType;
