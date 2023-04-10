import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const CampaignSortOrderGqlType = new GraphQLEnumType({
  name: Typename.CampaignSortOrder,
  values: {
    Newest: {},
    Oldest: {},
  },
});

export default CampaignSortOrderGqlType;
