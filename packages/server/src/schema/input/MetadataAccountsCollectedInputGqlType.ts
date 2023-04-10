import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";

const MetadataAccountsCollectedInputGqlType = new GraphQLInputObjectType({
  fields: {
    // One of these should be non-null
    collectorAddress: { type: GraphQLString },
    collectorUsername: { type: GraphQLString },
  },
  name: Typename.MetadataAccountsCollectedInput,
});

export default MetadataAccountsCollectedInputGqlType;
