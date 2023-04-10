import exhaustiveStringArray from "formfn-shared/dist/utils/array/exhaustiveStringArray";
import { ExcludeFutureAddedValue } from "types/ExcludeFutureAddedValue";
import CampaignCategoryExpress_enum from "types/relay/CampaignCategoryExpress_enum";

const CAMPAIGN_CATEGORIES: Array<
  ExcludeFutureAddedValue<CampaignCategoryExpress_enum>
> = exhaustiveStringArray<
  ExcludeFutureAddedValue<CampaignCategoryExpress_enum>
>()(
  "Art",
  "Brand",
  "Comics",
  "Culture",
  "DanceAndTheater",
  "Design",
  "Education",
  "Fashion",
  "FilmAndVideo",
  "Food",
  "Games",
  "Music",
  "Photography",
  "Podcasts",
  "Product",
  "Writing"
);

export default CAMPAIGN_CATEGORIES;
