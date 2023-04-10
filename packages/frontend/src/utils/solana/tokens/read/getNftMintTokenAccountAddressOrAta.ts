import { Connection, PublicKey } from "@solana/web3.js";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import getNftMintTokenAccountAddress from "utils/solana/tokens/getNftMintTokenAccountAddress";

export default async function getNftMintTokenAccountAddressOrAta(
  connection: Connection,
  mint: PublicKey,
  wallet: PublicKey
) {
  const tokenAccount = await getNftMintTokenAccountAddress(connection, mint);
  if (tokenAccount != null) {
    return tokenAccount;
  }

  const [ata] = await findAta(wallet, mint);
  return ata;
}
