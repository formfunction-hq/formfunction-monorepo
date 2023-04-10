import Environment from "formfn-shared/dist/types/Environment";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getEnvironment from "utils/getEnvironment";
import isDevSubdomain from "utils/isDevSubdomain";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";
import isPointToDev from "utils/urlparams/isPointToDev";
import isPointToProd from "utils/urlparams/isPointToProd";

function getRestBaseUrl() {
  const ldBootstrap = getLdBootstrap();

  const devUrl =
    ldBootstrap?.restApiUrl?.development ?? "https://apidev2.formfunction.xyz/";
  const prodUrl =
    ldBootstrap?.restApiUrl?.production ?? "https://api2.formfunction.xyz/";
  const testUrl =
    ldBootstrap?.restApiUrl?.testnet ?? "https://apitest.formfunction.xyz/";

  if (isPointToProd()) {
    return prodUrl;
  }

  if (isDevSubdomain() || isPointToDev()) {
    return devUrl;
  }

  const env = getEnvironment();
  switch (env) {
    case Environment.Development:
      return devUrl;
    case Environment.Local:
      return "http://localhost:4000/";
    case Environment.Testnet:
      return testUrl;
    case Environment.Production:
      return prodUrl;
    default:
      return assertUnreachable(env);
  }
}

export default function getRestUrl(path: string): string {
  const baseUrl = getRestBaseUrl();
  return `${baseUrl}${path}`;
}
