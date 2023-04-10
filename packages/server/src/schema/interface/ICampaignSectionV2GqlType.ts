import { GraphQLID, GraphQLInterfaceType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

export const ICAMPAIGN_SECTION_V2_FIELDS = {
  benefits: {
    description:
      "A list of benefits collectors receive for supporting the campaign " +
      "via this section",
    type: gqlNonNullListOfNonNull(GraphQLString),
  },
  description: { type: gqlNonNull(GraphQLString) },
  id: { type: gqlNonNull(GraphQLID) },
  title: { type: gqlNonNull(GraphQLString) },
};

const ICampaignSectionV2GqlType = new GraphQLInterfaceType({
  fields: ICAMPAIGN_SECTION_V2_FIELDS,
  name: Typename.ICampaignSectionV2,
});

export default ICampaignSectionV2GqlType;
