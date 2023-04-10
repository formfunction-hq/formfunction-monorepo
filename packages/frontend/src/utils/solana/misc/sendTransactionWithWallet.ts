import AnchorWallet from "types/AnchorWallet";
import {
  Commitment,
  Connection,
  Keypair,
  SendOptions,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { notify } from "components/toast/notifications";
import parseErrorMessage from "utils/solana/errors/parseErrorMessage";
import logIfNotProd from "utils/logIfNotProd";
import parseTransactionError from "utils/solana/errors/parseTransactionError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import logError from "utils/analytics/logError";
import toObject from "formfn-shared/dist/utils/toObject";
import signTransaction from "utils/solana/transactions/signTransaction";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import signLegacyTransactionWithAntiBotAuthority from "utils/transactions/signLegacyTransactionWithAntiBotSigner";
import UserFriendlyRpcErrorMessage from "types/enums/UserFriendlyRpcErrorMessage";
import isBotTaxedTransaction from "formfn-shared/dist/utils/solana/txs/parse/isBotTaxedTransaction";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import getEnvironment from "utils/getEnvironment";
import combineTransactions from "formfn-shared/dist/utils/solana/txs/combineTransactions";
import signVersionedTransactionWithAntiBotAuthority from "utils/transactions/signVersionedTransactionWithAntiBotSigner";
import getParsedTransaction from "utils/solana/transactions/getParsedTransaction";
import { getAddressLookupTableForEnvironment } from "@formfunction-hq/formfunction-auction-house";

const ERROR_MESSAGES_TO_IGNORE = [
  "User rejected the request.",
  "This request has been cancelled by the user.",
];

type GetTransactionArgs = {
  afterSignCallback?: (txid: string) => void;
  antiBotProtectionEnabled?: boolean;
  connection: Connection;
  signers?: Array<Keypair>;
  txs: Array<Transaction>;
  wallet: AnchorWallet;
};

async function getLegacyTransaction({
  afterSignCallback,
  antiBotProtectionEnabled = false,
  connection,
  signers,
  txs,
  wallet,
}: GetTransactionArgs) {
  const signedTransactionInitial = await signTransaction({
    connection,
    signers,
    txs,
    wallet,
  });

  const signedTransaction = antiBotProtectionEnabled
    ? await signLegacyTransactionWithAntiBotAuthority(signedTransactionInitial)
    : signedTransactionInitial;

  // NOTE: this signature is the same as the one returned by connection.sendRawTransaction.
  // However, connection.sendRawTransaction may throw if there is a network error, hence we want
  // to set txid prior to calling it.
  const txid = bs58.encode(signedTransaction.signature!);

  if (afterSignCallback != null) {
    afterSignCallback(txid);
  }

  return { signedTransaction, txid };
}

async function getV0Transaction(args: GetTransactionArgs) {
  const {
    afterSignCallback,
    antiBotProtectionEnabled,
    connection,
    signers,
    txs,
    wallet,
  } = args;
  const addressLookupTableAddress = getAddressLookupTableForEnvironment(
    getEnvironment()
  );
  const { value: addressLookupTable } = await connection.getAddressLookupTable(
    addressLookupTableAddress
  );
  if (addressLookupTable == null) {
    logError(
      AnalyticsEvent.AddressLookupTableError,
      `Could not find address lookup table for address ${addressLookupTableAddress.toString()}`
    );
    return getLegacyTransaction(args);
  }

  const { blockhash } = await connection.getLatestBlockhash();
  const combinedTxs = combineTransactions(txs);
  const transactionMessage = new TransactionMessage({
    instructions: combinedTxs.instructions,
    payerKey: wallet.publicKey,
    recentBlockhash: blockhash,
  }).compileToV0Message([addressLookupTable]);
  const transaction = new VersionedTransaction(transactionMessage);
  transaction.sign([...(signers ?? [])]);
  const signedTransactionInitial = await wallet.signVersionedTransaction(
    transaction
  );

  const signedTransaction = antiBotProtectionEnabled
    ? await signVersionedTransactionWithAntiBotAuthority(
        signedTransactionInitial
      )
    : signedTransactionInitial;

  // NOTE: this signature is the same as the one returned by connection.sendRawTransaction.
  // However, connection.sendRawTransaction may throw if there is a network error, hence we want
  // to set txid prior to calling it.
  const txid = bs58.encode(signedTransaction.signatures[0]);

  if (afterSignCallback != null) {
    afterSignCallback(txid);
  }

  return { signedTransaction, txid };
}

async function getTransaction(
  args: GetTransactionArgs & {
    shouldUseLegacyTransaction?: boolean;
  }
) {
  const { shouldUseLegacyTransaction } = args;
  if (shouldUseLegacyTransaction === true) {
    return getLegacyTransaction(args);
  }

  return getV0Transaction(args);
}

export default async function sendTransactionWithWallet(
  argsInitial: {
    // We don't always want to check for the bot tax, because it requires an additional RPC call.
    checkForBotTax?: boolean;
    commitment?: Commitment;
    loggingData: { [key: string]: any };
    options?: SendOptions;
    shouldUseLegacyTransaction?: boolean;
  } & GetTransactionArgs
): Promise<Maybe<string>> {
  let txid = null;
  const args = {
    ...argsInitial,
    options: argsInitial.options ?? {
      preflightCommitment: "confirmed",
    },
  };

  try {
    const result = await getTransaction(args);
    const { signedTransaction } = result;
    txid = result.txid;

    await args.connection.sendRawTransaction(
      signedTransaction.serialize(),
      args.options
    );

    const latestBlockhash = await args.connection.getLatestBlockhash();
    const confirmResult = await args.connection.confirmTransaction(
      {
        ...latestBlockhash,
        signature: txid,
      },
      args.commitment ?? "confirmed"
    );

    if (confirmResult.value.err != null) {
      logIfNotProd(
        `tx error from confirmTransaction for txid = ${txid}`,
        JSON.stringify(confirmResult.value.err)
      );
      logError(
        AnalyticsEvent.RpcError,
        JSON.stringify(confirmResult.value.err),
        {
          commitment: args.commitment ?? "confirmed",
          err: JSON.stringify(confirmResult.value.err),
          errorType: "Confirmed transaction has error",
          txid,
          ...toObject(args.loggingData),
        }
      );
      notify({
        description: parseTransactionError(confirmResult.value.err),
        message: "Transaction error",
        type: "error",
      });

      return null;
    }

    // Check if tx was bot taxed
    if (args.checkForBotTax === true) {
      try {
        // TODO: may want to add a custom time out here if it becomes problematic perf-wise
        const parsed = await getParsedTransaction(args.connection, txid);
        if (parsed != null && isBotTaxedTransaction(parsed)) {
          logError(
            AnalyticsEvent.BotTaxedTransaction,
            `${txid} was bot taxed`,
            {
              commitment: args.commitment ?? "confirmed",
              txid,
              ...toObject(args.loggingData),
            }
          );
          notify({
            description: ErrorMessageMsg.UnexpectedTransactionError,
            message: "Transaction error",
            type: "error",
          });

          return null;
        }
      } catch {
        // Do nothing if parsing the tx fails for some reason
      }
    }

    return txid;
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error(`tx error for txid = ${txid} (threw)`);
    // eslint-disable-next-line no-console
    console.error(e.logs);
    const { errorCode, errorMessage } = parseErrorMessage(e.message);
    if (!ERROR_MESSAGES_TO_IGNORE.includes(errorMessage)) {
      const logEvent =
        errorMessage === UserFriendlyRpcErrorMessage.TransactionTooLarge
          ? AnalyticsEvent.TransactionTooLarge
          : AnalyticsEvent.RpcError;
      logError(logEvent, e, {
        commitment: args.commitment ?? "confirmed",
        errorCode,
        errorMessage,
        errorType: "Error was thrown",
        txid,
        ...toObject(args.loggingData),
      });
    }
    notify({
      description: errorMessage,
      message: "Transaction error",
      type: "error",
    });

    return null;
  }
}
