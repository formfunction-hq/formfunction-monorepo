import UsersEdgeGqlType from "src/schema/object/pagination/UsersEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const UsersConnectionGqlType = createConnectionGqlType(
  UsersEdgeGqlType,
  Typename.UsersConnection
);

export default UsersConnectionGqlType;
