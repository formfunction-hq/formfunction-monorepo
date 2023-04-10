import PostsEdgeGqlType from "src/schema/object/pagination/PostsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const PostsConnectionGqlType = createConnectionGqlType(
  PostsEdgeGqlType,
  Typename.PostsConnection
);

export default PostsConnectionGqlType;
