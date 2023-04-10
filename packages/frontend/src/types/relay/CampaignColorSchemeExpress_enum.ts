import graphql from "babel-plugin-relay/macro";
import { CampaignColorSchemeExpress_enum } from "types/relay/__generated__/CampaignColorSchemeExpressEnum_CampaignV2.graphql";

const _fragment = graphql`
  fragment CampaignColorSchemeExpressEnum_CampaignV2 on CampaignV2 {
    # eslint-disable-next-line relay/unused-fields
    colorScheme
  }
`;

export default CampaignColorSchemeExpress_enum;
