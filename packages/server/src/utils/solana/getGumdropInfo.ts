import { getProgramIdsFromEnvironment } from "@formfunction-hq/formfunction-gumdrop";
import Environment from "formfn-shared/dist/types/Environment";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getEnvironment from "src/utils/getEnvironment";

export default function getGumdropInfo(environment = getEnvironment()) {
  switch (environment) {
    case Environment.Local:
      return getProgramIdsFromEnvironment(Environment.Development);
    case Environment.Development:
    case Environment.Production:
    case Environment.Testnet:
      return getProgramIdsFromEnvironment(environment);
    default:
      return assertUnreachable(environment);
  }
}
