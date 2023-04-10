import Environment from "formfn-shared/dist/types/Environment";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getEnvironment from "src/utils/getEnvironment";

export default function getLinkForEnvironment(relativeLink: string) {
  const env = getEnvironment();
  switch (env) {
    case Environment.Local:
      return `http://localhost:3000${relativeLink}`;
    case Environment.Development:
      return `https://dev.formfunction.xyz${relativeLink}`;
    case Environment.Testnet:
      return `https://test.formfunction.xyz${relativeLink}`;
    case Environment.Production:
      return `https://formfunction.xyz${relativeLink}`;
    default:
      return assertUnreachable(env);
  }
}
