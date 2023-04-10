import exhaustiveStringArray from "formfn-shared/dist/utils/array/exhaustiveStringArray";
import { ExcludeFutureAddedValue } from "types/ExcludeFutureAddedValue";
import CampaignSortOrder_enum from "types/relay/CampaignSortOrder_enum";

const CAMPAIGN_SORT_ORDERS = exhaustiveStringArray<
  ExcludeFutureAddedValue<CampaignSortOrder_enum>
>()("Newest", "Oldest");

export default CAMPAIGN_SORT_ORDERS;
