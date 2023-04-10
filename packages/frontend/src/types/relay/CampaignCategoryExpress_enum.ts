import graphql from "babel-plugin-relay/macro";
import { CampaignCategoryExpress_enum } from "types/relay/__generated__/CampaignCategoryExpressEnum_CampaignV2.graphql";

const _fragment = graphql`
  fragment CampaignCategoryExpressEnum_CampaignV2 on CampaignV2 {
    # eslint-disable-next-line relay/unused-fields
    category
  }
`;

export default CampaignCategoryExpress_enum;
