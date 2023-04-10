import { GraphQLFieldConfig } from "graphql";
import SafetyCheckMutationsResponseGqlType from "src/schema/object/response/safety-check/SafetyCheckMutationsResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const safetyCheckMutationsMutationField: GraphQLFieldConfig<unknown, any> = {
  description: "Mutation field that houses safety check mutations",
  resolve: () => ({}),
  type: gqlNonNull(SafetyCheckMutationsResponseGqlType),
};

export default safetyCheckMutationsMutationField;
