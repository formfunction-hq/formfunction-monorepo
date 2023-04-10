import {
  Connection,
  sendAndConfirmTransaction as realSendAndConfirmTransaction,
  Signer,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { notify } from "components/toast/notifications";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import logIfNotProd from "utils/logIfNotProd";
import parseErrorMessage from "utils/solana/errors/parseErrorMessage";

export default async function sendAndConfirmTransaction(
  connection: Connection,
  transaction: Transaction,
  signers: Array<Signer>
): Promise<Maybe<TransactionSignature>> {
  try {
    return await realSendAndConfirmTransaction(
      connection,
      transaction,
      signers,
      {
        skipPreflight: false,
      }
    );
  } catch (e) {
    if (
      typeof window !== "undefined" &&
      typeof window.document !== "undefined"
    ) {
      notify({
        description: parseErrorMessage((e as Error).message),
        message: "Transaction error",
        type: "error",
      });
    } else {
      logIfNotProd("tx error", e);
    }

    return null;
  }
}
