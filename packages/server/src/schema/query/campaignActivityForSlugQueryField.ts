import { GraphQLFieldConfig } from "graphql";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import CampaignActivityForSlugResponseGqlType from "src/schema/object/response/campaigns/CampaignActivityForSlugResponseGqlType";

const campaignActivityForSlugQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: gqlNonNull(CampaignActivityForSlugResponseGqlType),
};

export default campaignActivityForSlugQueryField;
