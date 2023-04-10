import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const MetadataAccountsEdgeGqlType = createEdgeGqlType(
  MetadataAccountGqlType,
  Typename.MetadataAccountsEdge
);

export default MetadataAccountsEdgeGqlType;
