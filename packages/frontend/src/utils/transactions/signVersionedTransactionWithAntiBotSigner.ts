import { VersionedTransaction } from "@solana/web3.js";
import axios from "axios";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import logError from "utils/analytics/logError";
import getApiHeaders from "utils/api/getApiHeaders";
import getRestUrl from "utils/env/getRestUrl";

type SignedTxResponse = {
  tx: Array<number>;
};

export default async function signVersionedTransactionWithAntiBotAuthority(
  transaction: VersionedTransaction
): Promise<VersionedTransaction> {
  try {
    const url = getRestUrl("preprocessVersionedTransaction");
    const body = { tx: Array.from(transaction.serialize()) };
    const config = {
      headers: {
        ...getApiHeaders(),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post<SignedTxResponse>(url, body, config);
    return VersionedTransaction.deserialize(Uint8Array.from(response.data.tx));
  } catch (err: any) {
    logError(AnalyticsEvent.AntiBotSignerFail, err);
    throw new Error(
      err.response?.status === 400
        ? "An unexpected error occurred."
        : "You are attempting to buy too fast, please slow down."
    );
  }
}
