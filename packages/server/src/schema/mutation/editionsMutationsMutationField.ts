import { GraphQLFieldConfig } from "graphql";
import EditionsMutationsResponseGqlType from "src/schema/object/response/editions/EditionsMutationsResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const editionsMutationsMutationField: GraphQLFieldConfig<unknown, any> = {
  description: "Mutation field that houses mutations for Editions.",
  resolve: () => ({}),
  type: gqlNonNull(EditionsMutationsResponseGqlType),
};

export default editionsMutationsMutationField;
