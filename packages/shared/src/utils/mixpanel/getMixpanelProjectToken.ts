import MixpanelProjectToken from "types/enums/MixpanelProjectToken";
import Environment from "types/Environment";
import assertUnreachable from "utils/assertUnreachable";

export default function getMixpanelProjectToken(env: Environment) {
  switch (env) {
    case Environment.Production:
      return MixpanelProjectToken.Production;
    case Environment.Development:
    case Environment.Local:
    case Environment.Testnet:
      return MixpanelProjectToken.Sandbox;
    default:
      return assertUnreachable(env);
  }
}
