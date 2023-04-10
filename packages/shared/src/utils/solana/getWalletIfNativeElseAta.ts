import { PublicKey } from "@solana/web3.js";
import findAta from "utils/solana/pdas/findAta";
import isNative from "utils/solana/isNative";

export default async function getWalletIfNativeElseAta(
  wallet: PublicKey,
  treasuryMint: PublicKey
) {
  if (isNative(treasuryMint)) {
    return wallet;
  }

  const [ata] = await findAta(wallet, treasuryMint);
  return ata;
}
