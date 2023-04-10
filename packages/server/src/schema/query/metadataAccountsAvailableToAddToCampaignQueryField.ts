import { GraphQLFieldConfig } from "graphql";
import MetadataAccountsAvailableToAddToCampaignResponseGqlType from "src/schema/object/response/MetadataAccountsAvailableToAddToCampaignResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const metadataAccountsAvailableToAddToCampaignQueryField: GraphQLFieldConfig<
  unknown,
  any
> = {
  resolve: () => ({}),
  type: gqlNonNull(MetadataAccountsAvailableToAddToCampaignResponseGqlType),
};

export default metadataAccountsAvailableToAddToCampaignQueryField;
