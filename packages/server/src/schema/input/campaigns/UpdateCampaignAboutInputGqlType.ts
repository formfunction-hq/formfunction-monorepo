import { GraphQLID, GraphQLInputObjectType } from "graphql";
import CampaignAboutInputGqlType from "src/schema/input/campaigns/CampaignAboutInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UpdateCampaignAboutInputGqlType = new GraphQLInputObjectType({
  fields: {
    about: { type: gqlNonNull(CampaignAboutInputGqlType) },
    campaignId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.UpdateCampaignAboutInput,
});

export default UpdateCampaignAboutInputGqlType;
