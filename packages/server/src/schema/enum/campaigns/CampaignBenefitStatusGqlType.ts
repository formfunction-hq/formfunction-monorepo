import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with CampaignBenefitStatus DB enum
const CampaignBenefitStatusGqlType = new GraphQLEnumType({
  name: Typename.CampaignBenefitStatus,
  values: {
    Concluded: {},
    Ongoing: {},
    Pending: {},
  },
});

export default CampaignBenefitStatusGqlType;
