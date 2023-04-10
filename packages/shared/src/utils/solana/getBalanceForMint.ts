import { Connection, PublicKey } from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";
import getAccountBalance from "utils/solana/getAccountBalance";
import isNative from "utils/solana/isNative";
import findAta from "utils/solana/pdas/findAta";

export default async function getBalanceForMint(
  connection: Connection,
  mint: PublicKey,
  wallet: PublicKey,
  shouldFindAta = true
): Promise<Maybe<number>> {
  if (isNative(mint)) {
    return getAccountBalance(connection, wallet);
  }

  const [tokenAccount] = shouldFindAta ? await findAta(wallet, mint) : [wallet];
  const result = await connection.getTokenAccountBalance(tokenAccount);
  return Number(result.value.amount);
}
