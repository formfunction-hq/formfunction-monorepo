import { CandyMachineMintPhase } from "@formfunction-hq/formfunction-candy-machine";
import assertUnreachable from "utils/assertUnreachable";

export default function isSaleMintPhase(mintPhase: CandyMachineMintPhase) {
  switch (mintPhase) {
    case CandyMachineMintPhase.Expired:
    case CandyMachineMintPhase.Premint:
      return false;
    case CandyMachineMintPhase.Allowlist:
    case CandyMachineMintPhase.Public:
      return true;
    default:
      return assertUnreachable(mintPhase);
  }
}
