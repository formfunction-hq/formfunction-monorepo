import { GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";

const MetadataAccountsForImportResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccounts: {
      type: gqlNonNullListOfNonNull(MetadataAccountGqlType),
    },
  },
  name: Typename.MetadataAccountsForImportResponse,
});

export default MetadataAccountsForImportResponseGqlType;
