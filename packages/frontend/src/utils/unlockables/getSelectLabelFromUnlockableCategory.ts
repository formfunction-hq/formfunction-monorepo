import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { UnlockableCategoryType } from "types/UnlockableCategoryType";

export default function getSelectLabelFromUnlockableCategory(
  category: UnlockableCategoryType
) {
  switch (category) {
    case "PhysicalOriginal":
      return "Physical original";
    case "PhysicalPrint":
      return "Physical print";
    case "DigitalDownload":
      return "Digital download";
    case "Merch":
      return "Merch";
    case "Other":
      return "Other";
    default:
      return assertUnreachable(category);
  }
}
