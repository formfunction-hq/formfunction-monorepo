import { ExcludeFutureAddedValue } from "types/ExcludeFutureAddedValue";
import CampaignSortOrder_enum from "types/relay/CampaignSortOrder_enum";

const HUMAN_READABLE_CAMPAIGN_SORT_ORDER: Record<
  ExcludeFutureAddedValue<CampaignSortOrder_enum>,
  string
> = {
  Newest: "Newest",
  Oldest: "Oldest",
};

export default HUMAN_READABLE_CAMPAIGN_SORT_ORDER;
