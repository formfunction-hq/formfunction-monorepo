import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

export const CAMPAIGN_FOR_SLUG_INPUT_FIELDS = {
  campaignSlug: { type: gqlNonNull(GraphQLString) },

  // One of these two should be non-null
  creatorId: { type: GraphQLString },
  creatorUsername: { type: GraphQLString },
};

const CampaignForSlugInputGqlType = new GraphQLInputObjectType({
  fields: CAMPAIGN_FOR_SLUG_INPUT_FIELDS,
  name: Typename.CampaignForSlugInput,
});

export default CampaignForSlugInputGqlType;
