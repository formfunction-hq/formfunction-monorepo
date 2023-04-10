import { GraphQLFieldConfig } from "graphql";
import ReactionMutationsMutationResponseGqlType from "src/schema/object/response/reactions/ReactionMutationsMutationResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const reactionMutationsMutationField: GraphQLFieldConfig<unknown, any> = {
  description: "Mutation field that houses mutations for Reactions.",
  resolve: () => ({}),
  type: gqlNonNull(ReactionMutationsMutationResponseGqlType),
};

export default reactionMutationsMutationField;
