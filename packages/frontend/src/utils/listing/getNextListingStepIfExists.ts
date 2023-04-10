import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ListingStep from "types/enums/ListingStep";

export default function getNextListingStepIfExists({
  currentStep,
  enablePnft,
  enableUnlockable,
}: {
  currentStep: ListingStep;
  enablePnft: boolean;
  enableUnlockable: boolean;
}): Maybe<ListingStep> {
  switch (currentStep) {
    case ListingStep.Setup:
      if (enableUnlockable) {
        return ListingStep.AddUnlockable;
      }

      if (enablePnft) {
        return ListingStep.CreatePnft;
      }

      return null;
    case ListingStep.AddUnlockable:
      if (enablePnft) {
        return ListingStep.CreatePnft;
      }

      return null;
    case ListingStep.CreatePnft:
      return null;
    default:
      return assertUnreachable(currentStep);
  }
}
