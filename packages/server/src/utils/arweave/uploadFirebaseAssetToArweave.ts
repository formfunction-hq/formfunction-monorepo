import dayjs from "src/utils/dates/dayjsex";
import { Request } from "express";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { getStorage, getMetadata, getBytes, ref } from "firebase/storage";
import createAndSignTransaction from "src/utils/arweave/bundlr/createAndSignTransaction";
import uploadToArweaveUsingBundlrWithTx from "src/utils/arweave/bundlr/uploadToArweaveUsingBundlrWithTx";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import logError from "src/utils/analytics/logError";

export const UPLOAD_TXID_DOES_NOT_MATCH =
  "upload txid does not match stored txid";

/**
 * Uploads the NFT asset stored on Firebase to Arweave.
 */
export default async function uploadFirebaseAssetToArweave(
  req: Request,
  fileStoragePath: string,
  assetTxid?: string,
  contentTypeOverride?: string
): Promise<string> {
  const startTime = dayjs();
  const storage = getStorage();
  const fileRef = ref(storage, fileStoragePath);
  const [data, fileMetadata] = await Promise.all([
    getBytes(fileRef),
    getMetadata(fileRef),
  ]);
  const dataArray = new Uint8Array(data);
  const tx = await createAndSignTransaction(dataArray, [
    {
      name: "Content-Type",
      value: contentTypeOverride ?? (fileMetadata.contentType || "unknown"),
    },
  ]);
  if (assetTxid && tx.id !== assetTxid) {
    logError(
      AnalyticsEvent.UploadNftToArweaveFail,
      UPLOAD_TXID_DOES_NOT_MATCH,
      req,
      {
        ...getTimeElapsed(startTime),
        assetTxid,
        fileStoragePath,
        txid: tx.id,
      }
    );
    throw new Error(UPLOAD_TXID_DOES_NOT_MATCH);
  }

  const { response, txid } = await uploadToArweaveUsingBundlrWithTx(
    req,
    tx,
    dataArray.length
  );
  if (response != null && response.status !== 200 && response.status !== 201) {
    logError(
      AnalyticsEvent.UploadNftToArweaveFail,
      "non-success response code from arweave upload",
      req,
      {
        ...getTimeElapsed(startTime),
        assetTxid,
        bundlrResponse: {
          ...response,
          request: null,
        },
        fileStoragePath,
        transaction: txid,
      }
    );
    throw new Error(
      `non-success response code ${response.status} from arweave upload for txid: ${txid}`
    );
  }

  logEvent(AnalyticsEvent.UploadNftToArweaveSuccess, req, {
    ...getTimeElapsed(startTime),
    bundlrResponse: response != null ? response.data : null,
    fileStoragePath,
    txid,
  });

  return txid;
}
