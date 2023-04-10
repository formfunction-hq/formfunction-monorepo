import { Connection, ConnectionConfig } from "@solana/web3.js";
import Network from "src/types/enums/Network";
import getRpcHostFromNetwork from "src/utils/solana/getRpcHostFromNetwork";

export default function getNewConnection(config?: ConnectionConfig) {
  const network = process.env.SOLANA_NETWORK as Network;
  return new Connection(
    getRpcHostFromNetwork(network),
    config ?? { confirmTransactionInitialTimeout: 90 * 1000 }
  );
}
