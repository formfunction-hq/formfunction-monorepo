import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const RemoveUserAsTeamMemberFromCampaignInputGqlType =
  new GraphQLInputObjectType({
    fields: {
      campaignId: { type: gqlNonNull(GraphQLID) },
      userId: { type: gqlNonNull(GraphQLID) },
    },
    name: Typename.RemoveUserAsTeamMemberFromCampaignInput,
  });

export default RemoveUserAsTeamMemberFromCampaignInputGqlType;
