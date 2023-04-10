import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { UnlockableCategory } from "hooks/__generated__/useListNftForSaleMutation.graphql";
import getSelectLabelFromUnlockableCategory from "utils/unlockables/getSelectLabelFromUnlockableCategory";

// The display label copy is the same as the select label, but we omit some categories.
export default function getDisplayLabelFromUnlockableCategory(
  category: UnlockableCategory
) {
  switch (category) {
    case "PhysicalOriginal":
    case "PhysicalPrint":
    case "DigitalDownload":
    case "Merch":
      return `${getSelectLabelFromUnlockableCategory(category)} `;
    case "Other":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(category);
  }
}
