import { NftMetadataV1Input } from "src/__generated__/generated";
import { getStorage, getMetadata, getBytes, ref } from "firebase/storage";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import { Request } from "express";
import getArweaveLink from "formfn-shared/dist/utils/getArweaveLink";
import createAndSignTransaction from "src/utils/arweave/bundlr/createAndSignTransaction";
import uploadToArweaveUsingBundlr from "src/utils/arweave/bundlr/uploadToArweaveUsingBundlr";
import { AxiosResponse } from "axios";
import logError from "src/utils/analytics/logError";
import is200StatusCode from "src/utils/is200StatusCode";
import getContentTypeFromFilename from "formfn-shared/dist/utils/getContentTypeFromFilename";

import ffmpeg from "fluent-ffmpeg";
import mkdirp from "mkdirp";
import * as path from "path";
import * as os from "os";
import * as fsPromises from "fs/promises";
import { nanoid } from "nanoid";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { JsonMetadata } from "@metaplex-foundation/js";

type FileInfo = {
  contentType: string;
  data: Uint8Array;
  tags: Array<{
    name: string;
    value: string;
  }>;
};

function getExtFromContentType(contentType: string) {
  if (contentType === "") {
    return undefined;
  }

  return contentType.split("/")[1];
}

async function getPreviewGifFromMp4(
  tempLocalPathToMp4: string,
  tempLocalGifFilePath: string,
  req: Request
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(tempLocalPathToMp4)
      // From https://superuser.com/a/556031
      .outputOption(
        "-vf",
        "fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"
      )
      .addOption("-loop", "0")
      .duration(10)
      .on("end", () => {
        logEvent(AnalyticsEvent.UploadMp4GifPreviewSuccess, req, {
          tempLocalGifFilePath,
          tempLocalPathToMp4,
        });
        resolve();
      })
      .on("error", (err) => {
        logError(AnalyticsEvent.UploadNftMetadataToArweaveFail, err, req, {
          description: "ffmpeg failed to save GIF preview",
          tempLocalGifFilePath,
          tempLocalPathToMp4,
        });
        reject();
      })
      .save(tempLocalGifFilePath);
  });
}

async function uploadGifPreviewFromMp4(mp4Data: Uint8Array, req: Request) {
  const tempLocalFilePath = path.join(os.tmpdir(), `mp4Preview/${nanoid()}`);
  const tempLocalGifFilePath = path.join(
    os.tmpdir(),
    `mp4Preview/${nanoid()}.gif`
  );
  const tempLocalDirPath = path.dirname(tempLocalFilePath);

  // Write MP4 to temp file to process
  await mkdirp(tempLocalDirPath);
  try {
    await fsPromises.appendFile(tempLocalFilePath, Buffer.from(mp4Data));
  } catch (e: any) {
    logError(
      AnalyticsEvent.UploadNftMetadataToArweaveFail,
      "Failed to write mp4 to temp file to obtain first frame",
      req,
      {
        tempLocalDirPath,
        tempLocalFilePath,
        tempLocalGifFilePath,
      }
    );
  }
  // Obtain first frame as image from mp4
  // and write it to tempLocalJpegFilePath
  await getPreviewGifFromMp4(tempLocalFilePath, tempLocalGifFilePath, req);

  const file = await fsPromises.readFile(tempLocalGifFilePath);
  return { file, tempLocalFilePath, tempLocalGifFilePath };
}

/**
 * Uploads the NFT metadata to Arweave.
 *
 * As part of this process, we also create and sign
 * the transaction for uploading the asset but defer
 * the actual upload (nftMetadataWebhook) to improve
 * perceived performance of the minting process.
 */
async function uploadNftMetadataToArweaveUsingBundlr(
  req: Request,
  metadataInput: NftMetadataV1Input,
  fileInfo: FileInfo,
  nonstandardFileInfo?: FileInfo
): Promise<{
  assetTxid: string;
  metadata: { [key: string]: any };
  metadataTxid: string;
  nonstandardAssetTxid: Maybe<string>;
  response: Maybe<AxiosResponse>;
}> {
  const [assetTransaction, nonstandardAssetTransaction] = await Promise.all([
    createAndSignTransaction(fileInfo.data, fileInfo.tags),
    nonstandardFileInfo != null
      ? createAndSignTransaction(
          nonstandardFileInfo.data,
          nonstandardFileInfo.tags
        )
      : null,
  ]);
  const assetLink = getArweaveLink(
    assetTransaction.id,
    getExtFromContentType(fileInfo.contentType)
  );
  const nonstandardAssetLink =
    nonstandardFileInfo == null
      ? null
      : getArweaveLink(
          nonstandardAssetTransaction!.id,
          getExtFromContentType(nonstandardFileInfo.contentType)
        );
  const isVideo = fileInfo.contentType.includes("video");

  const {
    name,
    symbol,
    description,
    seller_fee_basis_points,
    external_url,
    attributes,
    collection,
  } = metadataInput;

  const collectionJson = {
    family: collection?.family != null ? collection.family : "",
    name: collection?.name != null ? collection.name : "",
  };

  /**
   * NOTE: JSON field order is important and is recommended to match
   * the same order of the files in the Metaplex spec.
   *
   * Reference: https://docs.metaplex.com/token-metadata/Versions/v1.0.0/nft-standard#order-of-json-fields
   */
  const metadata = {
    animation_url: ["model/gltf-binary", "text/html"].includes(
      nonstandardFileInfo?.contentType ?? ""
    )
      ? nonstandardAssetLink
      : isVideo
      ? assetLink
      : undefined,
    attributes: attributes != null ? attributes : undefined,
    collection: collectionJson,
    description,
    external_url: external_url != null ? external_url : undefined,
    image: assetLink,
    name,
    properties: {
      category:
        nonstandardFileInfo?.contentType === "text/html"
          ? "html"
          : isVideo
          ? "video"
          : "image",
      creators: metadataInput.properties.creators,
      files: [
        {
          type: fileInfo.contentType,
          uri: assetLink,
        },
        ...(nonstandardAssetLink == null
          ? []
          : [
              {
                type: nonstandardFileInfo!.contentType,
                uri: nonstandardAssetLink,
              },
            ]),
      ],
    },
    seller_fee_basis_points,
    symbol,
  } satisfies JsonMetadata;

  // For MP4, upload GIF to Arweave as well so that the preview displays properly
  // on wallets like Phantom
  if (fileInfo.contentType.includes("mp4")) {
    const {
      file: gifFileData,
      tempLocalFilePath,
      tempLocalGifFilePath,
    } = await uploadGifPreviewFromMp4(fileInfo.data, req);
    const gifTransaction = await createAndSignTransaction(gifFileData, [
      { name: "Content-Type", value: "image/gif" },
    ]);
    const gifLink = getArweaveLink(gifTransaction.id, "gif");
    metadata.image = gifLink;
    metadata.properties.files.push({
      type: "image/gif",
      uri: gifLink,
    });

    const { response, txid: metadataTxid } = await uploadToArweaveUsingBundlr(
      req,
      gifFileData,
      [{ name: "Content-Type", value: "image/gif" }]
    );

    if (response != null && !is200StatusCode(response.status)) {
      logError(
        AnalyticsEvent.UploadMp4ThumbnailFail,
        "non-success response code from arweave upload for thumbnail for mp4",
        req,
        {
          bundlrResponse: {
            ...response,
            request: null,
          },
          metadataTxid,
        }
      );
    }

    await Promise.all([
      fsPromises.rm(tempLocalFilePath),
      fsPromises.rm(tempLocalGifFilePath),
    ]);
  }

  const metadataContent = JSON.stringify(metadata);
  const { response, txid: metadataTxid } = await uploadToArweaveUsingBundlr(
    req,
    metadataContent,
    [{ name: "Content-Type", value: "application/json" }]
  );

  return {
    assetTxid: assetTransaction.id,
    metadata,
    metadataTxid,
    nonstandardAssetTxid: nonstandardAssetTransaction?.id ?? null,
    response,
  };
}
async function uploadNftMetadataToArweave(
  req: Request,
  fileName: string,
  metadata: NftMetadataV1Input,
  nonstandardFileName?: MaybeUndef<string>
) {
  const storage = getStorage();
  const fileRef = ref(storage, fileName);
  const nonstandardFileRef =
    nonstandardFileName == null ? null : ref(storage, nonstandardFileName);
  const [data, fileMetadata, nonstandardData, nonstandardFileMetadata] =
    await Promise.all([
      getBytes(fileRef),
      getMetadata(fileRef),
      nonstandardFileRef == null ? null : getBytes(nonstandardFileRef),
      nonstandardFileRef == null ? null : getMetadata(nonstandardFileRef),
    ]);
  const contentType =
    fileMetadata.contentType ?? getContentTypeFromFilename(fileName);
  const nonstandardContentType =
    // For nonstandard files like .glb files, nonstandardFileMetadata.contentType is not reliable
    nonstandardFileName == null
      ? null
      : getContentTypeFromFilename(nonstandardFileName);

  return uploadNftMetadataToArweaveUsingBundlr(
    req,
    metadata,
    {
      contentType,
      data: new Uint8Array(data),
      tags: [{ name: "Content-Type", value: contentType }],
    },
    nonstandardFileMetadata == null || nonstandardData == null
      ? undefined
      : {
          contentType: nonstandardContentType!,
          data: new Uint8Array(nonstandardData),
          tags: [
            {
              name: "Content-Type",
              value: nonstandardContentType!,
            },
          ],
        }
  );
}

export default uploadNftMetadataToArweave;
