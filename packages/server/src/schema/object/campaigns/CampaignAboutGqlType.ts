import { GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";

export const CAMPAIGN_ABOUT_FIELDS = {
  campaign: {
    type: GraphQLString,
  },
  contactInfo: {
    type: GraphQLString,
  },
  creator: {
    type: GraphQLString,
  },
  risksAndChallenges: {
    type: GraphQLString,
  },
  timeline: {
    type: GraphQLString,
  },
};

const CampaignAboutGqlType = new GraphQLObjectType({
  fields: CAMPAIGN_ABOUT_FIELDS,
  name: Typename.CampaignAbout,
});

export default CampaignAboutGqlType;
