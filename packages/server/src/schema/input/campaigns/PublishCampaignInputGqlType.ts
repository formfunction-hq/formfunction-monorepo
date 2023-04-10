import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PublishCampaignInputGqlType = new GraphQLInputObjectType({
  fields: {
    campaignId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.PublishCampaignInput,
});

export default PublishCampaignInputGqlType;
