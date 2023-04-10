import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import sendAndConfirmTransaction from "utils/solana/misc/sendAndConfirmTransaction";
import mintToIx from "utils/solana/tokens/instructions/mintToIx";

export default async function mintTo(
  connection: Connection,
  mint: PublicKey,
  dest: PublicKey,
  mintAuthority: PublicKey,
  multiSigners: Array<Keypair>,
  amount: number
): Promise<Maybe<TransactionSignature>> {
  const instruction = await mintToIx(
    mint,
    dest,
    mintAuthority,
    multiSigners,
    amount
  );
  const transaction = new Transaction();
  transaction.add(instruction);

  return sendAndConfirmTransaction(connection, transaction, multiSigners);
}
