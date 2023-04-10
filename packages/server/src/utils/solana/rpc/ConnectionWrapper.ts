import {
  AccountInfo,
  Commitment,
  ConfirmedSignatureInfo,
  ConfirmedSignaturesForAddress2Options,
  ConfirmOptions,
  Finality,
  ParsedAccountData,
  ParsedTransactionWithMeta,
  PublicKey,
  RpcResponseAndContext,
  sendAndConfirmTransaction,
  Signer,
  TokenAccountBalancePair,
  TokenAccountsFilter,
  Transaction,
  TransactionSignature,
  VersionedTransactionResponse,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getConnection from "src/utils/solana/getConnection";
import retryFn from "src/utils/solana/rpc/retryFn";
import addLatestValidBlockheightToTx from "src/utils/solana/txs/addLatestValidBlockheightToTx";

const MAX_SUPPORTED_TRANSACTION_VERSION = 0;

export default class ConnectionWrapper {
  static async getAccountInfo(
    address: PublicKey,
    commitment?: Commitment
  ): Promise<Maybe<AccountInfo<Buffer>>> {
    try {
      const accountInfo = await retryFn(
        (connection) => connection.getAccountInfo(address, commitment),
        ConnectionWrapper.getAccountInfo.name,
        { address, commitment },
        (result) => result != null
      );
      return accountInfo;
    } catch {
      return null;
    }
  }

  static async getConfirmedSignaturesForAddress2(
    address: PublicKey,
    options?: ConfirmedSignaturesForAddress2Options,
    commitment?: Finality
  ): Promise<Array<ConfirmedSignatureInfo>> {
    return retryFn(
      (connection) =>
        connection.getConfirmedSignaturesForAddress2(
          address,
          options,
          commitment
        ),
      ConnectionWrapper.getConfirmedSignaturesForAddress2.name,
      { address, commitment, options }
    );
  }

  static async getParsedAccountInfo(
    address: PublicKey,
    commitment?: Commitment
  ): Promise<
    RpcResponseAndContext<Maybe<AccountInfo<Buffer | ParsedAccountData>>>
  > {
    try {
      const accountInfo = await retryFn(
        (connection) => connection.getParsedAccountInfo(address, commitment),
        ConnectionWrapper.getParsedAccountInfo.name,
        { address, commitment },
        (result) => result.value != null
      );
      return accountInfo;
    } catch {
      // TODO: should return a reasonable value for slot. Rn it's never used though.
      return { context: { slot: 0 }, value: null };
    }
  }

  static async getParsedTokenAccountsByOwner(
    ownerAddress: PublicKey,
    filter: TokenAccountsFilter,
    commitment?: Commitment
  ): Promise<
    RpcResponseAndContext<
      Array<{
        account: AccountInfo<ParsedAccountData>;
        pubkey: PublicKey;
      }>
    >
  > {
    return retryFn(
      (connection) =>
        connection.getParsedTokenAccountsByOwner(
          ownerAddress,
          filter,
          commitment
        ),
      ConnectionWrapper.getParsedTokenAccountsByOwner.name,
      { commitment, filter, ownerAddress }
    );
  }

  static async getParsedTransaction(
    signature: string,
    commitment?: Finality
  ): Promise<Maybe<ParsedTransactionWithMeta>> {
    try {
      const parsed = await retryFn(
        (connection) =>
          connection.getParsedTransaction(signature, {
            commitment,
            maxSupportedTransactionVersion: MAX_SUPPORTED_TRANSACTION_VERSION,
          }),
        ConnectionWrapper.getParsedTransaction.name,
        { commitment, signature },
        (result) => result != null
      );
      return parsed;
    } catch {
      return null;
    }
  }

  /**
   * NOTE: is NOT meant to minimize the number of null entries in the returned array.
   * Instead, this is just meant to mitigate cases where one or more of the RPCs throws.
   */
  static async getParsedTransactions(
    signatures: Array<TransactionSignature>,
    commitment?: Finality
  ): Promise<Array<Maybe<ParsedTransactionWithMeta>>> {
    return retryFn(
      (connection) =>
        connection.getParsedTransactions(signatures, {
          commitment,
          maxSupportedTransactionVersion: MAX_SUPPORTED_TRANSACTION_VERSION,
        }),
      ConnectionWrapper.getParsedTransactions.name,
      { commitment, signatures }
    );
  }

  static async getTokenLargestAccounts(
    mintAddress: PublicKey,
    commitment?: Commitment
  ): Promise<RpcResponseAndContext<Array<TokenAccountBalancePair>>> {
    return retryFn(
      (connection) =>
        connection.getTokenLargestAccounts(mintAddress, commitment),
      ConnectionWrapper.getTokenLargestAccounts.name,
      { commitment, mintAddress },
      undefined,
      // All RPCs will throw if an invalid mintAddress is passed.
      // We shouldn't log a fatal error in that case—the fatals are meant to
      // alert us when the RPC services themselves are having issues.
      "error"
    );
  }

  static async getTransaction(
    signature: string,
    commitment?: Finality
  ): Promise<Maybe<VersionedTransactionResponse>> {
    try {
      const response = await retryFn(
        (connection) =>
          connection.getTransaction(signature, {
            commitment,
            maxSupportedTransactionVersion: MAX_SUPPORTED_TRANSACTION_VERSION,
          }),
        ConnectionWrapper.getTransaction.name,
        { commitment, signature },
        (result) => result != null
      );
      return response;
    } catch {
      return null;
    }
  }

  static async sendAndConfirmTransaction(
    transaction: Transaction,
    signers: Array<Signer>,
    options: ConfirmOptions = {
      commitment: "confirmed",
      preflightCommitment: "confirmed",
    }
  ): Promise<TransactionSignature> {
    const connection = getConnection();
    return sendAndConfirmTransaction(
      connection,
      await addLatestValidBlockheightToTx(connection, transaction),
      signers,
      options
    );
  }
}
