import { Request } from "express";
import getOnchainNftMetadata from "formfn-shared/dist/utils/solana/metaplex/getOnchainNftMetadata";
import getConnection from "src/utils/solana/getConnection";
import { PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import getNftMetadataFileProperties from "formfn-shared/dist/utils/solana/metaplex/getNftMetadataFileProperties";
import axios from "axios";
import uploadToArweaveUsingBundlr from "src/utils/arweave/bundlr/uploadToArweaveUsingBundlr";
import uploadFirebaseAssetToArweave from "src/utils/arweave/uploadFirebaseAssetToArweave";
import getAssetPathFromFormfunctionAssetSrc from "src/utils/asset/getAssetPathFromFormfunctionAssetSrc";
import getContentTypeFromFilename from "formfn-shared/dist/utils/getContentTypeFromFilename";
import getArweaveLink from "formfn-shared/dist/utils/getArweaveLink";
import getUpdateMetadataTx from "formfn-shared/dist/utils/solana/metaplex/getUpdateMetadataTx";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";

export type MetadataUpdateFields = {
  asset?: {
    type: string;
    uri: string;
  };
  description?: string;
  name?: string;
};

// Assumes asset is uploaded to our Firebase storage for now
async function maybeUploadNewAsset(req: Request, assetUri?: string) {
  // TODO: add logic to not upload asset if it's already on arweave

  if (assetUri == null) {
    return { assetArweaveLink: null, assetContentType: null };
  }

  // Upload new file, if applicable
  const assetStoragePath = getAssetPathFromFormfunctionAssetSrc(assetUri);
  const assetContentType = getContentTypeFromFilename(assetStoragePath!);
  const assetArweaveTxid = await uploadFirebaseAssetToArweave(
    req,
    assetStoragePath!,
    undefined,
    assetContentType
  );

  return {
    assetArweaveLink: getArweaveLink(assetArweaveTxid),
    assetContentType,
  };
}

// Assumes that update authority of NFT is our authority wallet
// TODO: add ability to change update authority
export default async function updateNftMetadata(
  req: Request,
  mint: string,
  updateFields: MetadataUpdateFields
) {
  const connection = getConnection();
  const { metadata: existingMetadata } = await getOnchainNftMetadata(
    connection,
    new PublicKey(mint)
  );
  const existingArweaveMetadata = (await axios(existingMetadata.data.uri)).data;

  // 1. Upload new asset to Arweave, if needed
  const { assetArweaveLink, assetContentType } = await maybeUploadNewAsset(
    req,
    updateFields.asset?.uri
  );

  // 2. Construct new metadata to upload to Arweave
  const fileProperties = getNftMetadataFileProperties(
    assetArweaveLink != null
      ? [{ type: assetContentType, uri: assetArweaveLink }]
      : // Use existing if new file was not uploaded
        existingArweaveMetadata.properties.files
  );
  const newArweaveMetadata = {
    ...existingArweaveMetadata,
    animation_url: fileProperties.animation_url,
    image: fileProperties.properties.files[0].uri,
    properties: {
      ...(existingArweaveMetadata.properties ?? {}),
      files: fileProperties.properties.files,
    },
    ...(updateFields.name != null ? { name: updateFields.name } : {}),
    ...(updateFields.description != null
      ? { description: updateFields.description }
      : {}),
  };

  // 3. Upload new Arweave metadata
  const { txid: metadataArweaveTxid } = await uploadToArweaveUsingBundlr(
    req,
    JSON.stringify(newArweaveMetadata),
    [{ name: "Content-Type", value: "application/json" }]
  );

  const authorityKeypair = getAuthorityKeypair();
  const { tx: updateMetadataTx } = await getUpdateMetadataTx(
    connection,
    authorityKeypair.publicKey,
    new PublicKey(mint),
    { name: updateFields.name, uri: getArweaveLink(metadataArweaveTxid) }
  );

  // 4. Finally, update the metadata onchain
  await sendAndConfirmTransaction(connection, updateMetadataTx, [
    authorityKeypair,
  ]);
}
