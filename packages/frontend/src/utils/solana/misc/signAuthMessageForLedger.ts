import {
  Connection,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import SIGN_AUTH_MESSAGE from "formfn-shared/dist/constants/SignAuthMessage";
import { MyAnchorWallet } from "context/SolanaContext";
import getSignature from "utils/local-storage/getSignature";
import { MEMO_PROGRAM_ID } from "formfn-shared/dist/constants/SolanaConstants";
import setSignature from "utils/local-storage/setSignature";

/**
 * Inspired by https://github.com/solana-labs/solana/issues/21366#issuecomment-1194310677.
 *
 * We need this workaround because signMessage is not yet supported by Ledger. Note that they are currently working on this,
 * see https://github.com/solana-labs/solana/pull/26915 for more details.
 */
export default async function signAuthMessageForLedger(
  anchorWallet: MyAnchorWallet,
  connection: Connection
): Promise<boolean> {
  const existingSignature = getSignature(anchorWallet.publicKey.toString());

  if (existingSignature != null) {
    return false;
  }

  const tx = new Transaction();
  tx.add(
    new TransactionInstruction({
      data: Buffer.from(SIGN_AUTH_MESSAGE, "utf8"),
      keys: [],
      programId: MEMO_PROGRAM_ID,
    })
  );
  tx.feePayer = anchorWallet.publicKey;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  const signedTx = await anchorWallet.signTransaction(tx);
  const signature = signedTx.serialize().toString("hex");

  setSignature(anchorWallet.publicKey, signature);

  return true;
}
