import { GraphQLObjectType } from "graphql";
import CampaignV2GqlType from "src/schema/object/campaigns/CampaignV2GqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const CampaignsForHeroResponseGqlType = new GraphQLObjectType({
  fields: {
    campaigns: {
      type: gqlNonNullListOfNonNull(CampaignV2GqlType),
    },
  },
  name: Typename.CampaignsForHeroResponse,
});

export default CampaignsForHeroResponseGqlType;
