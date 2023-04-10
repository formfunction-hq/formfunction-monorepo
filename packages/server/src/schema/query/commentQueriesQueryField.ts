import { GraphQLFieldConfig } from "graphql";
import CommentQueriesResponseGqlType from "src/schema/object/response/comments/CommentQueriesResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const commentQueriesQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Query field that houses comment queries.",
  resolve: () => ({}),
  type: gqlNonNull(CommentQueriesResponseGqlType),
};

export default commentQueriesQueryField;
