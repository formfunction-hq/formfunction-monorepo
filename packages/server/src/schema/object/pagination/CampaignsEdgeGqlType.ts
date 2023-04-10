import CampaignV2GqlType from "src/schema/object/campaigns/CampaignV2GqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const CampaignsEdgeGqlType = createEdgeGqlType(
  CampaignV2GqlType,
  Typename.CampaignsEdge
);

export default CampaignsEdgeGqlType;
