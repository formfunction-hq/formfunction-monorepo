import { Connection, PublicKey } from "@solana/web3.js";
import getTokenAccountInfo from "utils/solana/tokens/read/getTokenAccountInfo";

export default async function getTokenAmount(
  connection: Connection,
  tokenAccount: PublicKey
): Promise<number> {
  return Number((await getTokenAccountInfo(connection, tokenAccount)).amount);
}
