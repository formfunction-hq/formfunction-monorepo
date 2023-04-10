import CookiePrefix from "formfn-shared/dist/types/enums/CookiePrefix";
import Environment from "formfn-shared/dist/types/Environment";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getEnvironment from "src/utils/getEnvironment";

export default function getCookieWithSuffix(
  cookiePrefix: CookiePrefix
): string {
  const env = getEnvironment();

  switch (env) {
    case Environment.Development:
      return `${cookiePrefix}_development`;
    case Environment.Local:
      return `${cookiePrefix}_local`;
    case Environment.Production:
      return `${cookiePrefix}`;
    case Environment.Testnet:
      return `${cookiePrefix}_testnet`;
    default:
      return assertUnreachable(env);
  }
}
