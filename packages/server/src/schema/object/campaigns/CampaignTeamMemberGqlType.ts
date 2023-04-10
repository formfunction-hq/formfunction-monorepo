import { GraphQLObjectType } from "graphql";
import CampaignTeamMemberRoleGqlType from "src/schema/enum/CampaignTeamMemberRoleGqlType";
import RequestStatusGqlType from "src/schema/enum/RequestStatusGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CampaignTeamMemberGqlType = new GraphQLObjectType({
  fields: {
    member: {
      type: gqlNonNull(UserGqlType),
    },
    role: { type: gqlNonNull(CampaignTeamMemberRoleGqlType) },
    status: { type: gqlNonNull(RequestStatusGqlType) },
  },
  name: Typename.CampaignTeamMember,
});

export default CampaignTeamMemberGqlType;
