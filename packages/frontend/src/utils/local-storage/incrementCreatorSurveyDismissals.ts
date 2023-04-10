import LocalStoragePrefix from "types/enums/LocalStoragePrefix";
import getCreatorSurveyDismissals from "utils/local-storage/getCreatorSurveyDismissals";
import setWithPrefix from "utils/local-storage/setWithPrefix";

export default function incrementCreatorSurveyDismissals(
  address: string
): void {
  const currVal = getCreatorSurveyDismissals(address);
  setWithPrefix(
    LocalStoragePrefix.CreatorSurveyDismissals,
    address,
    (currVal + 1).toString()
  );
}
