import dayjs from "src/utils/dates/dayjsex";
import Typename from "src/types/enums/Typename";
import {
  UploadNftToArweaveInput,
  UploadNftToArweaveResponse,
} from "src/__generated__/generated";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import MyContext from "src/types/MyContext";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import logError from "src/utils/analytics/logError";
import is200StatusCode from "src/utils/is200StatusCode";
import uploadNftMetadataToArweave from "src/utils/arweave/uploadNftMetadataToArweave";
import validateNftAttributesInput from "src/utils/validateNftAttributesInput";

async function uploadNftToArweaveResolver(
  context: MyContext,
  input: UploadNftToArweaveInput
): Promise<UploadNftToArweaveResponse> {
  const startTime = dayjs();
  const { fileName, nonstandardFileName } = input;

  // Will throw if attributes are invalid
  validateNftAttributesInput(input.metadata.attributes);

  const result = await uploadNftMetadataToArweave(
    context.req,
    fileName,
    input.metadata,
    nonstandardFileName
  );

  if (result.response != null && !is200StatusCode(result.response.status)) {
    logError(
      AnalyticsEvent.UploadNftMetadataToArweaveFail,
      "Upload to Arweave failed",
      context.req,
      {
        ...getTimeElapsed(startTime),
        bundlrResponse: result.response,
        fileName,
        metadata: result?.metadata,
      }
    );
    throw new Error("bundlr request failed");
  }

  const { assetTxid, metadataTxid, nonstandardAssetTxid } = result;
  logEvent(AnalyticsEvent.UploadNftMetadataToArweaveSuccess, context.req, {
    ...getTimeElapsed(startTime),
    assetTxid,
    fileName,
    metadata: result?.metadata,
    metadataTxid,
    nonstandardAssetTxid,
  });

  return {
    __typename: Typename.UploadNftToArweaveResponse,
    assetTxid,
    metadataTxid,
    nonstandardAssetTxid,
  };
}

export default uploadNftToArweaveResolver;
