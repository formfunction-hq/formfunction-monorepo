import {
  Connection,
  Keypair,
  PublicKey,
  TransactionSignature,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import sendAndConfirmTransaction from "utils/solana/misc/sendAndConfirmTransaction";
import getCreateAtaTx from "formfn-shared/dist/utils/solana/txs/getCreateAtaTx";

export default async function createAta(
  connection: Connection,
  mint: PublicKey,
  owner: PublicKey,
  payer: Keypair
): Promise<Maybe<TransactionSignature>> {
  const transaction = await getCreateAtaTx(mint, owner, payer);

  return sendAndConfirmTransaction(connection, transaction, [payer]);
}
