import Environment from "formfn-shared/dist/types/Environment";
import isDevSubdomain from "utils/isDevSubdomain";
import isLocalhost from "utils/isLocalhost";
import isTestnetSubdomain from "utils/isTestnetSubdomain";

export default function getEnvironment() {
  if (isLocalhost()) {
    return Environment.Local;
  }

  if (isTestnetSubdomain()) {
    return Environment.Testnet;
  }

  if (isDevSubdomain()) {
    return Environment.Development;
  }

  return Environment.Production;
}
