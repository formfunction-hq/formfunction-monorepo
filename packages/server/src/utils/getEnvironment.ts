import Environment from "formfn-shared/dist/types/Environment";

export default function getEnvironment() {
  switch (process.env.NODE_ENV) {
    case "local":
      return Environment.Local;
    case "test": // For tests, we want to use the devnet auction house info
    case "development":
      return Environment.Development;
    case "testnet":
      return Environment.Testnet;
    default:
      return Environment.Production;
  }
}
