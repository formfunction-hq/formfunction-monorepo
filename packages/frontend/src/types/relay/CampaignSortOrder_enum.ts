import graphql from "babel-plugin-relay/macro";
import { CampaignSortOrder_enum } from "types/relay/__generated__/CampaignSortOrderEnumQuery.graphql";

const _fragment = graphql`
  query CampaignSortOrderEnumQuery(
    $campaignSortOrder: CampaignSortOrder_enum!
  ) {
    CampaignsNamespace {
      # eslint-disable-next-line relay/unused-fields
      campaignsForExplore(input: { sortOrder: $campaignSortOrder }) {
        __typename
      }
    }
  }
`;

export default CampaignSortOrder_enum;
