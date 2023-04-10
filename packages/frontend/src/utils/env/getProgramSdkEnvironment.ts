import Environment from "formfn-shared/dist/types/Environment";

// On local environment we want to default the SDKs to use devnet.
export default function getProgramSdkEnvironment(environment: Environment) {
  return environment === Environment.Local
    ? Environment.Development
    : environment;
}
