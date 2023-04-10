import Mux from "@mux/mux-node";
import Environment from "formfn-shared/dist/types/Environment";
import getEnvironment from "src/utils/getEnvironment";

const MUX_TOKEN_ID = "REPLACEME";
const MUX_TOKEN_SECRET = "REPLACEME";

const MUX_TOKEN_ID_DEV = "REPLACEME";
const MUX_TOKEN_SECRET_DEV = "REPLACEME";

const environment = getEnvironment();

export default function getMuxClient(env = environment) {
  return new Mux(
    env === Environment.Production ? MUX_TOKEN_ID : MUX_TOKEN_ID_DEV,
    env === Environment.Production ? MUX_TOKEN_SECRET : MUX_TOKEN_SECRET_DEV
  );
}
