import { useState } from "react";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function useErrorMessage(defaultMsg?: ErrorMessageMsg) {
  return useState<Maybe<ErrorMessageMsg>>(defaultMsg ?? null);
}
