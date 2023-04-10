import { GraphQLInputObjectType } from "graphql";
import CampaignCategoryGqlType from "src/schema/enum/campaigns/CampaignCategoryGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const CampaignsFeaturedInputGqlType = new GraphQLInputObjectType({
  fields: {
    categories: {
      description: "If null or empty, no category filtering is applied.",
      type: gqlListOfNonNull(CampaignCategoryGqlType),
    },
  },
  name: Typename.CampaignsFeaturedInput,
});

export default CampaignsFeaturedInputGqlType;
