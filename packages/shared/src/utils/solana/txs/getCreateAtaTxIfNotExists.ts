import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";
import createAtaIx from "utils/solana/instructions/createAtaIx";

export default async function getCreateAtaTxIfNotExists(
  connection: Connection,
  ata: PublicKey,
  mint: PublicKey,
  owner: PublicKey,
  payer: PublicKey
): Promise<Maybe<Transaction>> {
  const ataAccountInfo = await connection.getAccountInfo(ata, "confirmed");
  if (ataAccountInfo != null) {
    // No need to create the ATA
    return null;
  }

  const instruction = await createAtaIx(mint, owner, payer);
  const transaction = new Transaction();
  transaction.add(instruction);

  return transaction;
}
