import { GraphQLInputObjectType } from "graphql";
import CampaignCategoryGqlType from "src/schema/enum/campaigns/CampaignCategoryGqlType";
import CampaignSortOrderGqlType from "src/schema/enum/CampaignSortOrderGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CampaignsForExploreInputGqlType = new GraphQLInputObjectType({
  fields: {
    categories: {
      description: "If null or empty, all categories are included.",
      type: gqlListOfNonNull(CampaignCategoryGqlType),
    },
    sortOrder: { type: gqlNonNull(CampaignSortOrderGqlType) },
  },
  name: Typename.CampaignsForExploreInput,
});

export default CampaignsForExploreInputGqlType;
