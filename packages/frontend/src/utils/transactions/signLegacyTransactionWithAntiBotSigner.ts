import { Transaction } from "@solana/web3.js";
import axios from "axios";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import logError from "utils/analytics/logError";
import getApiHeaders from "utils/api/getApiHeaders";
import getRestUrl from "utils/env/getRestUrl";

type SignedTxResponse = {
  tx: {
    data: Buffer;
    type: "Buffer";
  };
};

export default async function signLegacyTransactionWithAntiBotAuthority(
  transaction: Transaction
): Promise<Transaction> {
  try {
    const url = getRestUrl("preprocessTransaction");
    const body = { tx: transaction.serialize({ requireAllSignatures: false }) };
    const config = {
      headers: {
        ...getApiHeaders(),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post<SignedTxResponse>(url, body, config);
    return Transaction.from(response.data.tx.data);
  } catch (err: any) {
    logError(AnalyticsEvent.AntiBotSignerFail, err);
    throw new Error(
      err.response?.status === 400
        ? "An unexpected error occurred."
        : "You are attempting to buy too fast, please slow down."
    );
  }
}
