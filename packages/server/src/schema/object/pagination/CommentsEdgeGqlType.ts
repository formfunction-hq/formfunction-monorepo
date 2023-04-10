import CommentGqlType from "src/schema/object/CommentGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const CommentsEdgeGqlType = createEdgeGqlType(
  CommentGqlType,
  Typename.CommentsEdge
);

export default CommentsEdgeGqlType;
