import MetadataAccountsEdgeGqlType from "src/schema/object/pagination/MetadataAccountsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const MetadataAccountsConnectionGqlType = createConnectionGqlType(
  MetadataAccountsEdgeGqlType,
  Typename.MetadataAccountsConnection
);

export default MetadataAccountsConnectionGqlType;
