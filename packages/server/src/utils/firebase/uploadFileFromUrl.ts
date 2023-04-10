import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import * as fsPromises from "fs/promises";
import { nanoid } from "nanoid";
import axios from "axios";
import mkdirp from "mkdirp";
import firebaseAdmin from "src/utils/firebase/firebaseAdmin";
import probe from "probe-image-size";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export async function downloadAsset(url: string) {
  const tempLocalFilePath = path.join(os.tmpdir(), `downloaded/${nanoid()}`);
  const tempLocalDirPath = path.dirname(tempLocalFilePath);
  await mkdirp(tempLocalDirPath);
  await fsPromises.writeFile(tempLocalFilePath, "");

  const writer = fs.createWriteStream(tempLocalFilePath);

  const response = await axios({
    method: "GET",
    responseType: "stream",
    url,
  });

  response.data.pipe(writer);

  return new Promise<string>((resolve, reject) => {
    writer.on("finish", () => resolve(tempLocalFilePath));
    writer.on("error", reject);
  });
}

export default async function uploadFileFromUrl(
  url: string,
  storagePath: string,
  probeForDimensions?: boolean
): Promise<{
  dimensions: Maybe<{ height: number; width: number }>;
  downloadUrl: string;
  fileName: string;
}> {
  const bucket = firebaseAdmin.storage().bucket();
  const filePath = await downloadAsset(url);

  const tokenNonce = nanoid();
  await bucket.upload(filePath, {
    destination: storagePath,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: tokenNonce,
      },
    },
  });

  // We construct the URL manually to mimic the behavior of
  // getDownloadUrl (https://firebase.google.com/docs/reference/android/com/google/firebase/storage/StorageReference#getDownloadUrl()).
  //
  // See https://www.sentinelstand.com/article/guide-to-firebase-storage-download-urls-tokens for more info.
  const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${
    bucket.name
  }/o/${storagePath.replace(/\//g, "%2F")}?alt=media&token=${tokenNonce}`;
  try {
    // We probe this instead of the `url` that was passed in as it is more reliable
    // e.g., sometimes probing Arweave links do not work as expected and throws
    const dimensions = await (probeForDimensions === true
      ? probe(downloadUrl)
      : null);
    return {
      dimensions,
      downloadUrl,
      fileName: storagePath,
    };
  } catch (e: any) {
    return { dimensions: null, downloadUrl, fileName: storagePath };
  }
}
