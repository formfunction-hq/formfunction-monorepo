import UserFriendlyRpcErrorMessage from "types/enums/UserFriendlyRpcErrorMessage";
import getProgramErrorMessage from "utils/solana/errors/getProgramErrorMessage";
import { LangErrorMessage } from "@project-serum/anchor";

function extractErrorCodeFromMessage(errorMessage: string) {
  const match = errorMessage.match(/custom program error: .*/);

  if (match != null && match.length > 0) {
    const customProgramError = match[0].replace("custom program error: ", "");
    const customProgramErrorNum = parseInt(customProgramError, 16);
    return Number.isNaN(customProgramErrorNum) ? null : customProgramErrorNum;
  }

  return null;
}

export default function parseErrorMessage(errorMessage: string): {
  errorCode?: number;
  errorMessage: string;
} {
  const errorCode = extractErrorCodeFromMessage(errorMessage);
  if (errorCode != null) {
    const idlErrorMessage = getProgramErrorMessage(errorCode);
    if (idlErrorMessage != null) {
      return { errorCode, errorMessage: idlErrorMessage };
    }

    const anchorErrorMessage = LangErrorMessage.get(errorCode);
    if (anchorErrorMessage != null) {
      return { errorCode, errorMessage: anchorErrorMessage };
    }
  }

  if (
    errorMessage.includes(
      "Attempt to debit an account but found no record of a prior credit"
    )
  ) {
    return { errorMessage: UserFriendlyRpcErrorMessage.InsufficientFunds };
  }

  if (errorMessage.includes("simulation failed")) {
    return {
      errorMessage: UserFriendlyRpcErrorMessage.TransactionSimulationFailed,
    };
  }

  if (errorMessage.includes("Transaction too large")) {
    return { errorMessage: UserFriendlyRpcErrorMessage.TransactionTooLarge };
  }

  return { errorMessage };
}
