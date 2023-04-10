import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with CampaignStatus DB enum
const CampaignStatusGqlType = new GraphQLEnumType({
  name: Typename.CampaignStatus,
  values: {
    Approved: {},
    Concluded: {},
    Draft: {},
    Pending: {},
    Published: {},
    Rejected: {},
  },
});

export default CampaignStatusGqlType;
