import arrayOfUnionType from "formfn-shared/dist/utils/array/arrayOfUnionType";
import { UnlockableCategoryOption } from "types/UnlockableCategoryOption";
import { UnlockableCategoryType } from "types/UnlockableCategoryType";
import getSelectLabelFromUnlockableCategory from "utils/unlockables/getSelectLabelFromUnlockableCategory";

const arrayOfUnlockableCategories = arrayOfUnionType<UnlockableCategoryType>();

// Note: The order here maps to the order these fields appear in the select dropdown.
const UNLOCKABLE_CATEGORY_OPTIONS: Array<UnlockableCategoryOption> =
  arrayOfUnlockableCategories([
    "PhysicalOriginal",
    "PhysicalPrint",
    "DigitalDownload",
    "Merch",
    "Other",
  ]).map((value) => ({
    label: getSelectLabelFromUnlockableCategory(value),
    value,
  }));

export default UNLOCKABLE_CATEGORY_OPTIONS;
