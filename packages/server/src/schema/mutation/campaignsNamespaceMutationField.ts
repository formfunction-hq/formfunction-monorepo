import { GraphQLFieldConfig } from "graphql";
import CampaignsNamespaceMutationResponseGqlType from "src/schema/object/response/campaigns/CampaignsNamespaceMutationResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const campaignsNamespaceMutationField: GraphQLFieldConfig<unknown, any> = {
  description: "Namespace field for campaigns related mutations.",
  resolve: () => ({}),
  type: gqlNonNull(CampaignsNamespaceMutationResponseGqlType),
};

export default campaignsNamespaceMutationField;
