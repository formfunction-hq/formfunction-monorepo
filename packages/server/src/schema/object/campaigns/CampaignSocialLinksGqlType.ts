import { GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";

const CampaignSocialLinksGqlType = new GraphQLObjectType({
  fields: {
    discord: {
      type: GraphQLString,
    },
    instagram: {
      type: GraphQLString,
    },
    twitter: {
      type: GraphQLString,
    },
    website: {
      type: GraphQLString,
    },
  },
  name: Typename.CampaignSocialLinks,
});

export default CampaignSocialLinksGqlType;
