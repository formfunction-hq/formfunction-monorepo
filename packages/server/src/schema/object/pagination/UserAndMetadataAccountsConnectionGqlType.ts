import UserAndMetadataAccountsEdgeGqlType from "src/schema/object/pagination/UserAndMetadataAccountsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const UserAndMetadataAccountsConnectionGqlType = createConnectionGqlType(
  UserAndMetadataAccountsEdgeGqlType,
  Typename.UserAndMetadataAccountsConnection
);

export default UserAndMetadataAccountsConnectionGqlType;
