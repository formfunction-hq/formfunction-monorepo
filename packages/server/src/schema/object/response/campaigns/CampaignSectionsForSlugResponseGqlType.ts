import { GraphQLObjectType } from "graphql";
import CampaignSectionGqlType from "src/schema/object/campaigns/CampaignSectionGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const CampaignSectionsForSlugResponseGqlType = new GraphQLObjectType({
  fields: {
    campaignSections: { type: gqlListOfNonNull(CampaignSectionGqlType) },
  },
  name: Typename.CampaignSectionsForSlugResponse,
});

export default CampaignSectionsForSlugResponseGqlType;
