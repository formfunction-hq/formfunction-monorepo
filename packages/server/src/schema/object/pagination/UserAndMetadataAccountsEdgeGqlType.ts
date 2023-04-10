import UserAndMetadataAccountsGqlType from "src/schema/object/UserAndMetadataAccountsGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const UserAndMetadataAccountsEdgeGqlType = createEdgeGqlType(
  UserAndMetadataAccountsGqlType,
  Typename.UserAndMetadataAccountsEdge
);

export default UserAndMetadataAccountsEdgeGqlType;
