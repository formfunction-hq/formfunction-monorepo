import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const UpdateCampaignFundingTierOrderInputGqlType = new GraphQLInputObjectType({
  fields: {
    campaignId: { type: gqlNonNull(GraphQLID) },
    fundingTierOrder: { type: gqlNonNullListOfNonNull(GraphQLID) },
  },
  name: Typename.UpdateCampaignFundingTierOrderInput,
});

export default UpdateCampaignFundingTierOrderInputGqlType;
