import CAMPAIGN_CATEGORIES from "constants/CampaignCategories";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CampaignCategoryExpress_enum from "types/relay/CampaignCategoryExpress_enum";

export default function getCategoriesFromUrlParam(
  urlParamVal: Maybe<string>
): Array<CampaignCategoryExpress_enum> {
  if (urlParamVal == null) {
    return CAMPAIGN_CATEGORIES;
  }

  return urlParamVal.split(",").filter((val) =>
    // @ts-ignore
    CAMPAIGN_CATEGORIES.includes(val)
  ) as Array<CampaignCategoryExpress_enum>;
}
