import { GraphQLSchema } from "graphql";
import CampaignFundingTierTypeGqlType from "src/schema/enum/campaigns/CampaignFundingTierTypeGqlType";
import NotificationChannelGqlType from "src/schema/enum/NotificationChannelGqlType";
import NotificationTypeGqlType from "src/schema/enum/NotificationTypeGqlType";
import MutationGqlType from "src/schema/mutation/MutationGqlType";
import CampaignV2GqlType from "src/schema/object/campaigns/CampaignV2GqlType";
import PhotoGqlType from "src/schema/object/PhotoGqlType";
import QueryGqlType from "src/schema/query/QueryGqlType";

const schema = new GraphQLSchema({
  mutation: MutationGqlType,
  query: QueryGqlType,
  types: [
    CampaignFundingTierTypeGqlType,
    CampaignV2GqlType,
    NotificationChannelGqlType,
    NotificationTypeGqlType,
    PhotoGqlType,
  ],
});

export default schema;
