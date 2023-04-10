import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import sleep from "formfn-shared/dist/utils/sleep";
import dayjs from "src/utils/dates/dayjsex";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import isLastRetry from "src/utils/hasura/isLastRetry";

// NOTE: keep in sync with auction house program code
// See https://github.com/formfunction-hq/formfn-auction-house/pull/169 for rationale
// behind these logs.
const DELEGATE_WARNING_MESSAGES = [
  "WARNING: seller ATA has delegate",
  "WARNING: buyer ATA has delegate",
];

/**
 * When a new transaction is inserted into the NftTransaction database, wait
 * until it is finalized, and then check to make sure it did not fail.
 */
export default async function failedTransactionCheckWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { txid, type } = body.event.data.new;

  if (txid == null) {
    res.json({ success: true });
    return;
  }

  await sleep(dayjs.duration({ seconds: 30 }));
  const tx = await ConnectionWrapper.getParsedTransaction(txid, "finalized");

  if (tx == null) {
    const errorMessage = `Parsed tx was null for txid = ${txid}, type = ${type}`;
    if (isLastRetry(req)) {
      logError(AnalyticsEvent.FailedTransactionCheckError, errorMessage, req, {
        tx: body.event.data.new,
      });
    }
    res.status(500).json({ errorMessage });
    return;
  }

  if (tx.meta?.err != null) {
    const errorMessage = JSON.stringify(tx.meta.err);
    logError(AnalyticsEvent.FailedTransactionCheckError, errorMessage, req, {
      tx: body.event.data.new,
    });
    res.json({ errorMessage, success: true });
    return;
  }

  if (
    tx.meta?.logMessages?.some((val) =>
      DELEGATE_WARNING_MESSAGES.some((warningMessage) =>
        val.includes(warningMessage)
      )
    )
  ) {
    logError(
      AnalyticsEvent.TransactionTokenDelegateWarning,
      `Tx ${txid} contained token delegate warning log message`,
      req,
      {
        logMessages: tx.meta.logMessages,
        txid,
      }
    );
    res.json({ delegateWarning: true, success: true });
    return;
  }

  res.json({ success: true });
}
