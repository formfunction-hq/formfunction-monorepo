import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

/**
 * IMPORTANT: keep values in sync with the CampaignTeamMemberRole DB table.
 */
const CampaignTeamMemberRoleGqlType = new GraphQLEnumType({
  name: Typename.CampaignTeamMemberRole,
  values: {
    Admin: {},
    Creator: {},
    Member: {},
  },
});

export default CampaignTeamMemberRoleGqlType;
