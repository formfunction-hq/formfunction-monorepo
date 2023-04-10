import { Connection, ConnectionConfig } from "@solana/web3.js";
import Network from "src/types/enums/Network";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getRpcHostFromNetwork, {
  syncRpcHostFromNetwork,
} from "src/utils/solana/getRpcHostFromNetwork";
import CONNECTION_CONFIG from "src/constants/ConnectionConfig";

let connection: Maybe<Connection> = null;

export default function getConnection(config?: ConnectionConfig) {
  const network = process.env.SOLANA_NETWORK as Network;

  syncRpcHostFromNetwork(network, (url) => {
    // If the RPC url has changed, reset the connection
    connection = new Connection(url, config ?? CONNECTION_CONFIG);
  });

  if (connection == null) {
    connection = new Connection(
      getRpcHostFromNetwork(network),
      config ?? CONNECTION_CONFIG
    );
    return connection;
  }

  return connection;
}
