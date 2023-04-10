import { LDUser } from "launchdarkly-node-server-sdk";

// For most flags, uses the default variation.
//
// However, sometimes we want our server to see a different variation than our client.
// packages/frontend/[[index.ts]] uses example_user, so if we want our server to
// see a different variation, we need a different user.
const ldBackendUser: LDUser = { key: "backend_user" };

export default ldBackendUser;
