import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import attributesResolver from "src/resolvers/query/nested/metadata-account/data/attributesResolver";
import MetadataCreatorGqlType from "src/schema/object/MetadataCreatorGqlType";
import NftAttributeGqlType from "src/schema/object/NftAttributeGqlType";

import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const MetadataAccountDataGqlType = new GraphQLObjectType({
  fields: {
    attributes: {
      resolve: attributesResolver,
      type: gqlListOfNonNull(NftAttributeGqlType),
    },
    creators: {
      type: gqlListOfNonNull(MetadataCreatorGqlType),
    },
    name: { type: gqlNonNull(GraphQLString) },
    sellerFeeBasisPoints: { type: gqlNonNull(GraphQLInt) },
    symbol: { type: gqlNonNull(GraphQLString) },
    uri: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.MetadataAccountData,
});

export default MetadataAccountDataGqlType;
