import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";

export default async function getBundlrNodeUrl(): Promise<string> {
  return getLdFlag(
    LaunchDarklyFlag.BundlrNodeUrl,
    "https://node1.bundlr.network"
  );
}
