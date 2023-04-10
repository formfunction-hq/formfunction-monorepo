import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const MetadataAccountsAvailableToAddToCampaignInputGqlType =
  new GraphQLInputObjectType({
    fields: {
      campaignFundingTierId: { type: gqlNonNull(GraphQLString) },
      creatorAddress: { type: GraphQLString },
      creatorUsername: { type: GraphQLString },
    },
    name: Typename.MetadataAccountsAvailableToAddToCampaignInput,
  });

export default MetadataAccountsAvailableToAddToCampaignInputGqlType;
