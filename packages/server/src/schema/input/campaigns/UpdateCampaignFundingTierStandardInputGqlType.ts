import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const UpdateCampaignFundingTierStandardInputGqlType =
  new GraphQLInputObjectType({
    fields: {
      benefits: { type: gqlNonNullListOfNonNull(GraphQLString) },
      campaignFundingTierId: { type: gqlNonNull(GraphQLID) },
      description: { type: gqlNonNull(GraphQLString) },
      title: { type: gqlNonNull(GraphQLString) },
    },
    name: Typename.UpdateCampaignFundingTierStandardInput,
  });

export default UpdateCampaignFundingTierStandardInputGqlType;
