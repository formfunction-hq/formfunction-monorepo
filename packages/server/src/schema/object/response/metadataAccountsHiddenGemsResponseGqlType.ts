import { GraphQLObjectType } from "graphql";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const MetadataAccountsHiddenGemsResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccounts: {
      type: gqlNonNullListOfNonNull(MetadataAccountGqlType),
    },
  },
  name: Typename.MetadataAccountsHiddenGemsResponse,
});

export default MetadataAccountsHiddenGemsResponseGqlType;
