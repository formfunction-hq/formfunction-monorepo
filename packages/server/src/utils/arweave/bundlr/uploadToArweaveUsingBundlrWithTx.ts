import axios, { AxiosResponse } from "axios";
import { DataItem } from "arbundles";
import { Request } from "express";
import getBundlrNodeUrl from "src/utils/arweave/bundlr/getBundlrNodeUrl";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import maybeFundAccountBalance from "src/utils/arweave/bundlr/maybeFundAccountBalance";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const BUNDLR_DUPLICATE_ITEM_ERROR_MESSAGE =
  "Error occurred when inserting item. This can be caused by race condition when uploading the same tx at the same time";

export type BundlrUploadResponse = {
  response: Maybe<AxiosResponse>;
  txid: string;
};

export default async function uploadToArweaveUsingBundlrWithTx(
  req: Request,
  tx: DataItem,
  bytes: number
): Promise<BundlrUploadResponse> {
  // Check if account has sufficient balance and fund if
  // balance is insufficient.
  await maybeFundAccountBalance(req, bytes);

  const bundlrNodeUrl = await getBundlrNodeUrl();
  let response = null;
  // TODO[@bryancho]: start using the Bundlr client since the `transactions`
  // API supports doing this by providing a constant `anchor`.
  // We simply need to run this once and store as a constant in our code:
  //   Crypto.randomBytes(32).toString("base64").slice(0, 32)
  try {
    response = await axios.post(`${bundlrNodeUrl}/tx/solana`, tx.getRaw(), {
      headers: { "Content-Type": "application/octet-stream" },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
  } catch (e: any) {
    const errorResponseData = e.response?.data as Maybe<string>;
    // Bundlr started throwing 500s if the data has already been uploaded
    // This was the recommended approach by the Bundlr team to proceed for now
    // See https://formfunctionhq.slack.com/archives/C02T3R7K2P7/p1669738344831499
    // for more info.
    if (
      errorResponseData != null &&
      errorResponseData.includes(BUNDLR_DUPLICATE_ITEM_ERROR_MESSAGE)
    ) {
      return { response: null, txid: tx.id };
    }
    logError(AnalyticsEvent.BundlrError, e, req, { txid: tx.id });
    throw e;
  }

  return { response, txid: tx.id };
}
