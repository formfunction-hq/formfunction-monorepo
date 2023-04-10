import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const SubmitCampaignForApprovalInputGqlType = new GraphQLInputObjectType({
  fields: {
    campaignId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.SubmitCampaignForApprovalInput,
});

export default SubmitCampaignForApprovalInputGqlType;
