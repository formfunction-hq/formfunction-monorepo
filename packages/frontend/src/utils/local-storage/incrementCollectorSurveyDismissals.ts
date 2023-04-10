import LocalStoragePrefix from "types/enums/LocalStoragePrefix";
import getCollectorSurveyDismissals from "utils/local-storage/getCollectorSurveyDismissals";
import setWithPrefix from "utils/local-storage/setWithPrefix";

export default function incrementCollectorSurveyDismissals(
  address: string
): void {
  const currVal = getCollectorSurveyDismissals(address);
  setWithPrefix(
    LocalStoragePrefix.CollectorSurveyDismissals,
    address,
    (currVal + 1).toString()
  );
}
