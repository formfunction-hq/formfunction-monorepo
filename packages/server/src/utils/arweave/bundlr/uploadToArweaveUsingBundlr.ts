import { Request } from "express";
import createAndSignTransaction from "src/utils/arweave/bundlr/createAndSignTransaction";
import uploadToArweaveUsingBundlrWithTx, {
  BundlrUploadResponse,
} from "src/utils/arweave/bundlr/uploadToArweaveUsingBundlrWithTx";

export default async function uploadToArweaveUsingBundlr(
  req: Request,
  data: string | Uint8Array,
  tags: Array<{
    name: string;
    value: string;
  }>
): Promise<BundlrUploadResponse> {
  const tx = await createAndSignTransaction(data, tags);

  return uploadToArweaveUsingBundlrWithTx(req, tx, data.length);
}
