enum UserFriendlyRpcErrorMessage {
  InsufficientFunds = "Insufficient funds",
  TransactionSimulationFailed = "Transaction simulation failed",
  TransactionTooLarge = "This operation is not permitted due to Solana transaction limitations. " +
    "Please contact the help center if you need assistance.",
}

export default UserFriendlyRpcErrorMessage;
