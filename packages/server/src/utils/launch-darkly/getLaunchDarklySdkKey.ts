import Environment from "formfn-shared/dist/types/Environment";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getEnvironment from "src/utils/getEnvironment";

export default function getLaunchDarklySdkKey() {
  const env = getEnvironment();
  switch (env) {
    case Environment.Local:
      return "REPLACEME";
    case Environment.Development:
      return "REPLACEME";
    case Environment.Testnet:
      return "REPLACEME";
    case Environment.Production:
      return "REPLACEME";
    default:
      return assertUnreachable(env);
  }
}
