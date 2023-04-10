import exhaustiveStringArray from "formfn-shared/dist/utils/array/exhaustiveStringArray";
import { ExcludeFutureAddedValue } from "types/ExcludeFutureAddedValue";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";

const CAMPAIGN_STATUSES: Array<
  ExcludeFutureAddedValue<CampaignStatusExpress_enum>
> = exhaustiveStringArray<
  ExcludeFutureAddedValue<CampaignStatusExpress_enum>
>()("Approved", "Concluded", "Draft", "Pending", "Rejected", "Published");

export default CAMPAIGN_STATUSES;
