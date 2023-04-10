import { Connection, PublicKey } from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";

export default async function getAccountBalance(
  connection: Connection,
  publicKey: PublicKey
): Promise<Maybe<number>> {
  const accountInfo = await connection.getAccountInfo(publicKey);
  return accountInfo?.lamports ?? null;
}
