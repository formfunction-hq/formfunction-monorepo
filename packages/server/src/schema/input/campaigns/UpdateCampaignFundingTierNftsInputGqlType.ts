import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const UpdateCampaignFundingTierNftsInputGqlType = new GraphQLInputObjectType({
  fields: {
    campaignFundingTierId: { type: gqlNonNull(GraphQLID) },
    nftIds: { type: gqlNonNullListOfNonNull(GraphQLID) },
  },
  name: Typename.UpdateCampaignFundingTierNftsInput,
});

export default UpdateCampaignFundingTierNftsInputGqlType;
