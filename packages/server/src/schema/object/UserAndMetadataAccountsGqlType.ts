import { GraphQLObjectType } from "graphql";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UserAndMetadataAccountsGqlType = new GraphQLObjectType({
  fields: {
    // TODO: would be nice to add pagination here. For now, we'll just limit the number
    // of accounts returned.
    metadataAccounts: {
      type: gqlNonNullListOfNonNull(MetadataAccountGqlType),
    },
    user: { type: gqlNonNull(UserGqlType) },
  },
  name: Typename.UserAndMetadataAccounts,
});

export default UserAndMetadataAccountsGqlType;
