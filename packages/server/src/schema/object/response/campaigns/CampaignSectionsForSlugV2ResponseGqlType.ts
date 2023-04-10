import { GraphQLObjectType } from "graphql";
import CampaignSectionV2GqlType from "src/schema/union/CampaignSectionV2GqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const CampaignSectionsForSlugV2ResponseGqlType = new GraphQLObjectType({
  fields: {
    campaignSections: { type: gqlListOfNonNull(CampaignSectionV2GqlType) },
  },
  name: Typename.CampaignSectionsForSlugV2Response,
});

export default CampaignSectionsForSlugV2ResponseGqlType;
