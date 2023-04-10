import { GraphQLInputObjectType, GraphQLInt } from "graphql";
import Typename from "src/types/enums/Typename";

const MetadataOffchainImageInputGqlType = new GraphQLInputObjectType({
  fields: {
    height: { type: GraphQLInt },
  },
  name: Typename.MetadataOffchainImageInput,
});

export default MetadataOffchainImageInputGqlType;
