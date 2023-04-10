import { GraphQLFieldConfig } from "graphql";
import CommentMutationsMutationResponseGqlType from "src/schema/object/response/comments/CommentMutationsMutationResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const commentMutationsMutationField: GraphQLFieldConfig<unknown, any> = {
  description: "Mutation field that houses mutations for Comments.",
  resolve: () => ({}),
  type: gqlNonNull(CommentMutationsMutationResponseGqlType),
};

export default commentMutationsMutationField;
