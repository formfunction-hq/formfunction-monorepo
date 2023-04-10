import graphql from "babel-plugin-relay/macro";
import { CampaignStatusExpress_enum } from "types/relay/__generated__/CampaignStatusExpressEnum_CampaignV2.graphql";

const _fragment = graphql`
  fragment CampaignStatusExpressEnum_CampaignV2 on CampaignV2 {
    # eslint-disable-next-line relay/unused-fields
    status
  }
`;

export default CampaignStatusExpress_enum;
