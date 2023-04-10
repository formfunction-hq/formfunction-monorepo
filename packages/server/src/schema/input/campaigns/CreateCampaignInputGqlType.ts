import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import CampaignCategoryGqlType from "src/schema/enum/campaigns/CampaignCategoryGqlType";
import CampaignColorSchemeGqlType from "src/schema/enum/campaigns/CampaignColorSchemeGqlType";
import CampaignTeamMemberRoleGqlType from "src/schema/enum/CampaignTeamMemberRoleGqlType";
import AssetInputGqlType from "src/schema/input/AssetInputGqlType";
import CampaignGoalInputGqlType from "src/schema/input/campaigns/CampaignGoalInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const CampaignTeamMemberInputGqlType = new GraphQLInputObjectType({
  fields: {
    role: { type: gqlNonNull(CampaignTeamMemberRoleGqlType) },
    userId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.CampaignTeamMemberInput,
});

export const CAMPAIGN_BASIC_INFO_INPUT_FIELDS = {
  category: { type: gqlNonNull(CampaignCategoryGqlType) },
  colorScheme: { type: gqlNonNull(CampaignColorSchemeGqlType) },
  goal: { type: gqlNonNull(CampaignGoalInputGqlType) },
  tagline: { type: gqlNonNull(GraphQLString) },
  teamMembers: {
    type: gqlNonNullListOfNonNull(CampaignTeamMemberInputGqlType),
  },
  title: { type: gqlNonNull(GraphQLString) },
};

const CreateCampaignInputGqlType = new GraphQLInputObjectType({
  fields: {
    ...CAMPAIGN_BASIC_INFO_INPUT_FIELDS,
    previewAsset: { type: gqlNonNull(AssetInputGqlType) },
  },
  name: Typename.CreateCampaignInput,
});

export default CreateCampaignInputGqlType;
