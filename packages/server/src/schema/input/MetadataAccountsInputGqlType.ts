import { GraphQLBoolean, GraphQLInputObjectType } from "graphql";
import NftStatusGqlType from "src/schema/enum/NftStatusGqlType";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const MetadataAccountsInputGqlType = new GraphQLInputObjectType({
  fields: {
    address: { type: gqlNonNull(PublicKeyScalarGqlType) },
    includeCreator: { type: GraphQLBoolean },
    includeOffPlatform: { type: GraphQLBoolean },
    includeOwner: { type: GraphQLBoolean },
    status: { type: NftStatusGqlType },
  },
  name: Typename.MetadataAccountsInput,
});

export default MetadataAccountsInputGqlType;
