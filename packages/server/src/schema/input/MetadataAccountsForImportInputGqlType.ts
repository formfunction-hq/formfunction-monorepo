import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const MetadataAccountsForImportInputGqlType = new GraphQLInputObjectType({
  fields: {
    mintAddresses: { type: gqlNonNullListOfNonNull(GraphQLString) },
  },
  name: Typename.MetadataAccountsForImportInput,
});

export default MetadataAccountsForImportInputGqlType;
