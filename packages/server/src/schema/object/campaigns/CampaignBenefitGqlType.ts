import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CampaignBenefitGqlType = new GraphQLObjectType({
  fields: {
    description: { type: gqlNonNull(GraphQLString) },
    id: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.CampaignBenefit,
});

export default CampaignBenefitGqlType;
