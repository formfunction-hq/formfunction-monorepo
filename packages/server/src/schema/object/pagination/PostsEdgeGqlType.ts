import PostGqlType from "src/schema/union/PostGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const PostsEdgeGqlType = createEdgeGqlType(PostGqlType, Typename.PostsEdge);

export default PostsEdgeGqlType;
