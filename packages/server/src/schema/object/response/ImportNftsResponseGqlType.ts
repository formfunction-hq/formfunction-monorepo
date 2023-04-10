import { GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";

const ImportNftsResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccountsImported: {
      type: gqlNonNullListOfNonNull(MetadataAccountGqlType),
    },
    mintAddressesFailedToImport: {
      type: gqlNonNullListOfNonNull(GraphQLString),
    },
  },
  name: Typename.ImportNftsResponse,
});

export default ImportNftsResponseGqlType;
