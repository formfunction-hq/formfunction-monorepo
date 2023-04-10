import CommentsEdgeGqlType from "src/schema/object/pagination/CommentsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const CommentsConnectionGqlType = createConnectionGqlType(
  CommentsEdgeGqlType,
  Typename.CommentsConnection
);

export default CommentsConnectionGqlType;
