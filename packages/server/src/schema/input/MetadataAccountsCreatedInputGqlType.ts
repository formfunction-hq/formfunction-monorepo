import { GraphQLBoolean, GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";

const MetadataAccountsCreatedInputGqlType = new GraphQLInputObjectType({
  fields: {
    // One of these should be non-null
    creatorAddress: { type: GraphQLString },
    creatorUsername: { type: GraphQLString },
    includeCollaborations: { defaultValue: true, type: GraphQLBoolean },
  },
  name: Typename.MetadataAccountsCreatedInput,
});

export default MetadataAccountsCreatedInputGqlType;
