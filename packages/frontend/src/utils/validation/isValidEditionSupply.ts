import MAX_EDITION_SUPPLY from "constants/MaxEditionSupply";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function isValidEditionSupply(editionSupply: Maybe<number>) {
  return (
    editionSupply != null &&
    editionSupply <= MAX_EDITION_SUPPLY &&
    editionSupply > 1
  );
}
