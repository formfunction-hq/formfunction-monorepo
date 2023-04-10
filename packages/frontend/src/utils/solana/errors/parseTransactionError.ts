import { TransactionError } from "@solana/web3.js";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import getProgramErrorMessage from "utils/solana/errors/getProgramErrorMessage";

export default function parseTransactionError(
  transactionError: TransactionError
): string {
  if (typeof transactionError === "string") {
    return transactionError;
  }

  // @ts-ignore
  const ixError = transactionError.InstructionError;
  if (ixError == null) {
    return ErrorMessageMsg.UnexpectedTransactionError;
  }

  if (Array.isArray(ixError) && ixError.length >= 2) {
    const customError = ixError[1].Custom;
    if (customError != null) {
      return (
        getProgramErrorMessage(customError) ??
        ErrorMessageMsg.UnexpectedTransactionError
      );
    }
  }

  return ErrorMessageMsg.UnexpectedTransactionError;
}
