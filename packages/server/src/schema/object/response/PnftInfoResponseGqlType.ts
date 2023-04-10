import { GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";

const PnftInfoResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccount: {
      type: MetadataAccountGqlType,
    },
  },
  name: Typename.PnftInfoResponse,
});

export default PnftInfoResponseGqlType;
