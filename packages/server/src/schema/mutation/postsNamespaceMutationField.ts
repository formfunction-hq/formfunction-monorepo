import { GraphQLFieldConfig } from "graphql";
import PostsNamespaceMutationResponseGqlType from "src/schema/object/response/posts/PostsNamespaceMutationResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const postsNamespaceMutationField: GraphQLFieldConfig<unknown, any> = {
  description: "Namespace field for post related mutations.",
  resolve: () => ({}),
  type: gqlNonNull(PostsNamespaceMutationResponseGqlType),
};

export default postsNamespaceMutationField;
