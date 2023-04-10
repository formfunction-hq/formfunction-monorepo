import Environment from "formfn-shared/dist/types/Environment";
import getEnvironment from "utils/getEnvironment";

export default function getLaunchDarklyClientSideId() {
  switch (getEnvironment()) {
    case Environment.Testnet:
      return "REPLACEME";
    case Environment.Local:
      return "REPLACEME";
    case Environment.Development:
      return "REPLACEME";
    case Environment.Production:
    default:
      return "REPLACEME";
  }
}
