import ld, { LDClient } from "launchdarkly-node-server-sdk";
import getLaunchDarklySdkKey from "src/utils/launch-darkly/getLaunchDarklySdkKey";

// Use an empty client when running scripts to avoid starting the LD client.
const noOpClient = { variation: () => null };

const ldClient =
  process.env.DISABLE_LD === "true"
    ? noOpClient
    : ld.init(getLaunchDarklySdkKey());

export default ldClient as LDClient;
