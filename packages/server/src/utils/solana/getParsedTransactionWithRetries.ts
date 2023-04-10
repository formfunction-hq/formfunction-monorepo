import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import sleep from "formfn-shared/dist/utils/sleep";
import dayjs from "src/utils/dates/dayjsex";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import { Finality } from "@solana/web3.js";
import logEvent from "src/utils/analytics/logEvent";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";

export default async function getParsedTransactionWithRetries(
  txid: string,
  type: NftTransactionTypeExpress_Enum,
  numRetries = 5,
  commitment?: Finality
) {
  const startTime = dayjs();

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numRetries; i++) {
    // eslint-disable-next-line no-await-in-loop
    const parsedTx = await ConnectionWrapper.getParsedTransaction(
      txid,
      commitment ?? "confirmed"
    );

    if (parsedTx != null) {
      return parsedTx;
    }

    const loggingData = {
      attemptNumber: i,
      commitment,
      numRetries,
      txid,
      type,
      ...getTimeElapsed(startTime),
    };

    if (numRetries - i <= 2) {
      // Don't log error for first few retries, too noisy.
      // Instead, only log for last 2 retries.
      logError(
        AnalyticsEvent.GetParsedTransactionError,
        `Got null when parsing tx ${txid} of type ${type}`,
        null,
        loggingData
      );
    } else {
      logEvent(AnalyticsEvent.GetParsedTransactionError, null, loggingData);
    }

    // eslint-disable-next-line no-await-in-loop
    await sleep(dayjs.duration({ seconds: i }));
  }

  return null;
}
