import { ConnectionConfig } from "@solana/web3.js";
import customFetch from "src/utils/solana/rpc/customFetch";

const CONNECTION_CONFIG: ConnectionConfig = {
  commitment: "confirmed",
  confirmTransactionInitialTimeout: 90 * 1000,
  // @ts-ignore
  fetch: customFetch,
};

export default CONNECTION_CONFIG;
