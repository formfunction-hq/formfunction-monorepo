import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import RequestStatusGqlType from "src/schema/enum/RequestStatusGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";

import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const MetadataCreatorGqlType = new GraphQLObjectType({
  fields: {
    address: { type: gqlNonNull(PublicKeyScalarGqlType) },
    requestId: { type: GraphQLString },
    share: { type: gqlNonNull(GraphQLInt) },
    status: { type: gqlNonNull(RequestStatusGqlType) },
    user: { type: UserGqlType },
  },
  name: Typename.MetadataCreator,
});

export default MetadataCreatorGqlType;
