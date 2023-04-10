import { GraphQLID, GraphQLInputObjectType } from "graphql";
import { CAMPAIGN_FOR_SLUG_INPUT_FIELDS } from "src/schema/input/campaigns/CampaignForSlugInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const CampaignHoldersForSlugInputGqlType = new GraphQLInputObjectType({
  fields: {
    ...CAMPAIGN_FOR_SLUG_INPUT_FIELDS,
    fundingTierIds: { defaultValue: null, type: gqlListOfNonNull(GraphQLID) },
    viewerId: { type: GraphQLID },
  },
  name: Typename.CampaignHoldersForSlugInput,
});

export default CampaignHoldersForSlugInputGqlType;
