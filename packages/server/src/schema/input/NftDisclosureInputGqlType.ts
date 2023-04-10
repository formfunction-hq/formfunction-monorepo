import { GraphQLInputObjectType, GraphQLString } from "graphql";
import NftDisclosureTypeGqlType from "src/schema/enum/NftDisclosureTypeGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftDisclosureInputGqlType = new GraphQLInputObjectType({
  fields: {
    details: { type: GraphQLString },
    type: { type: gqlNonNull(NftDisclosureTypeGqlType) },
  },
  name: Typename.NftDisclosureInput,
});

export default NftDisclosureInputGqlType;
