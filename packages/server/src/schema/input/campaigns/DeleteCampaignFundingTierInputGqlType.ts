import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const DeleteCampaignFundingTierInputGqlType = new GraphQLInputObjectType({
  fields: {
    campaignFundingTierId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.DeleteCampaignFundingTierInput,
});

export default DeleteCampaignFundingTierInputGqlType;
