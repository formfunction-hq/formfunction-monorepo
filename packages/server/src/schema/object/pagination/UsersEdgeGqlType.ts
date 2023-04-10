import UserGqlType from "src/schema/object/UserGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const UsersEdgeGqlType = createEdgeGqlType(UserGqlType, Typename.UsersEdge);

export default UsersEdgeGqlType;
