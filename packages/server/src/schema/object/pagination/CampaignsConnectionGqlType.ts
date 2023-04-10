import CampaignsEdgeGqlType from "src/schema/object/pagination/CampaignsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const CampaignsConnectionGqlType = createConnectionGqlType(
  CampaignsEdgeGqlType,
  Typename.CampaignsConnection
);

export default CampaignsConnectionGqlType;
