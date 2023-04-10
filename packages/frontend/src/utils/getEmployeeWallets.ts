import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";

// Keep default wallet addresses in sync with server/src/utils/auth/isEmployee.ts
export default function getEmployeeWallets() {
  // Defaults are set to make it easier on local dev
  return getLdBootstrap()?.teamWallets ?? [];
}
