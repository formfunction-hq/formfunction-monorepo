import { GraphQLObjectType } from "graphql";
import CampaignCategoryGqlType from "src/schema/enum/campaigns/CampaignCategoryGqlType";
import CampaignV2GqlType from "src/schema/object/campaigns/CampaignV2GqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const CampaignsFeaturedResponseGqlType = new GraphQLObjectType({
  fields: {
    campaigns: {
      type: gqlNonNullListOfNonNull(CampaignV2GqlType),
    },
    featuredCategories: {
      type: gqlNonNullListOfNonNull(CampaignCategoryGqlType),
    },
  },
  name: Typename.CampaignsFeaturedResponse,
});

export default CampaignsFeaturedResponseGqlType;
