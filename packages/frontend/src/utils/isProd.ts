import Environment from "formfn-shared/dist/types/Environment";
import getEnvironment from "utils/getEnvironment";

export default function isProd(): boolean {
  return getEnvironment() === Environment.Production;
}
