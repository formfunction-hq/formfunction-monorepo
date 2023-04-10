import { GraphQLFieldConfig } from "graphql";
import AirdropMutationsMutationResponseGqlType from "src/schema/object/response/airdrop/AirdropMutationsMutationResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const airdropMutationsMutationField: GraphQLFieldConfig<unknown, any> = {
  description: "Mutation field that houses Airdrop mutations",
  resolve: () => ({}),
  type: gqlNonNull(AirdropMutationsMutationResponseGqlType),
};

export default airdropMutationsMutationField;
