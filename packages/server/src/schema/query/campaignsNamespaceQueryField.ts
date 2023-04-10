import { GraphQLFieldConfig } from "graphql";
import CampaignsNamespaceQueryResponseGqlType from "src/schema/object/response/campaigns/CampaignsNamespaceQueryResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const campaignsNamespaceQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Namespace field for campaign related queries.",
  resolve: () => ({}),
  type: gqlNonNull(CampaignsNamespaceQueryResponseGqlType),
};

export default campaignsNamespaceQueryField;
