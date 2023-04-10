import { Account, getAccount } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

export default async function getTokenAccountInfo(
  connection: Connection,
  tokenAccount: PublicKey
): Promise<Account> {
  return getAccount(connection, tokenAccount);
}
