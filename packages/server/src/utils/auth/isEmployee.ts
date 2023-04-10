import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";

export default async function isEmployee(userId: MaybeUndef<string>) {
  // Defaults are set to make it easier on local dev
  return (
    await getLdFlag(LaunchDarklyFlag.TeamWallets, [] as Array<string>)
  ).includes(userId ?? "");
}
