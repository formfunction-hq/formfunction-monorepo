import isNumber from "formfn-shared/dist/utils/numbers/isNumber";
import LocalStoragePrefix from "types/enums/LocalStoragePrefix";
import getWithPrefix from "utils/local-storage/getWithPrefix";

export default function getCollectorSurveyDismissals(address: string): number {
  const val = getWithPrefix(
    LocalStoragePrefix.CollectorSurveyDismissals,
    address
  );
  if (val == null || !isNumber(val)) {
    return 0;
  }

  return Number(val);
}
