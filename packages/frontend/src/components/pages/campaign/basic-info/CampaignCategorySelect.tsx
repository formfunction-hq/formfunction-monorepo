import CustomSelect from "components/select/CustomSelect";
import CAMPAIGN_CATEGORIES from "constants/CampaignCategories";
import HUMAN_READABLE_CAMPAIGN_CATEGORY from "constants/HumanReadableCampaignCategory";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import CampaignCategoryExpress_enum from "types/relay/CampaignCategoryExpress_enum";

const OPTIONS: Array<{ label: string; value: CampaignCategoryExpress_enum }> =
  CAMPAIGN_CATEGORIES.map((category) => ({
    label: HUMAN_READABLE_CAMPAIGN_CATEGORY[category],
    value: category,
  }));

type Props = {
  defaultValue?: MaybeUndef<CampaignCategoryExpress_enum>;
  hasError: boolean;
  onChange: (val: CampaignCategoryExpress_enum) => void;
};

export default function CampaignCategorySelect({
  defaultValue,
  hasError,
  onChange,
}: Props): JSX.Element {
  return (
    <CustomSelect
      defaultValue={
        defaultValue == null
          ? null
          : {
              label: OPTIONS.find(({ value }) => value === defaultValue)!.label,
              value: defaultValue,
            }
      }
      hasError={hasError}
      onChange={(selectedOption) => {
        const { value } = selectedOption as {
          label: string;
          value: CampaignCategoryExpress_enum;
        };
        onChange(value);
      }}
      options={OPTIONS}
      placeholder="Select a category"
    />
  );
}
