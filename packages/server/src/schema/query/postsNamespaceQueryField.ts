import { GraphQLFieldConfig } from "graphql";
import PostsNamespaceQueryResponseGqlType from "src/schema/object/response/posts/PostsNamespaceQueryResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const postsNamespaceQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Namespace field for Post queries.",
  resolve: () => ({}),
  type: gqlNonNull(PostsNamespaceQueryResponseGqlType),
};

export default postsNamespaceQueryField;
