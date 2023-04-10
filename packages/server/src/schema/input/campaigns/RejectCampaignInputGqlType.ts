import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLString,
} from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const RejectCampaignInputGqlType = new GraphQLInputObjectType({
  fields: {
    campaignId: { type: gqlNonNull(GraphQLID) },
    feedback: { type: GraphQLString },
    isPermaReject: { type: gqlNonNull(GraphQLBoolean) },
  },
  name: Typename.RejectCampaignInput,
});

export default RejectCampaignInputGqlType;
