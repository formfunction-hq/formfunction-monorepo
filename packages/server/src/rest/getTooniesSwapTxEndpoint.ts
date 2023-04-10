import { createTransferCheckedInstruction } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import getArweaveLink from "formfn-shared/dist/utils/getArweaveLink";
import ixToTx from "formfn-shared/dist/utils/solana/ix/ixToTx";
import getMintMasterEditionTx from "formfn-shared/dist/utils/solana/metaplex/getMintMasterEditionTx";
import getNftMetadataFileProperties from "formfn-shared/dist/utils/solana/metaplex/getNftMetadataFileProperties";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import getCreateAtaTxIfNotExists from "formfn-shared/dist/utils/solana/txs/getCreateAtaTxIfNotExists";
import {
  MEDIA_STORAGE_PATH,
  METADATA,
} from "src/resolvers/mutation/shareInfoAndSwapForTooniesResolver";
import uploadToArweaveUsingBundlr from "src/utils/arweave/bundlr/uploadToArweaveUsingBundlr";
import uploadFirebaseAssetToArweave from "src/utils/arweave/uploadFirebaseAssetToArweave";
import getUserFromRequestHeaders from "src/utils/auth/getUserFromRequestHeaders";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getConnection from "src/utils/solana/getConnection";
import loadAuctionHouseSdk from "src/utils/solana/loadAuctionHouseSdk";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

async function getMintProofOfOwnershipNftTx(req: Request) {
  const assetArweaveTxid = await uploadFirebaseAssetToArweave(
    req,
    MEDIA_STORAGE_PATH
  );
  const assetArweaveUri = getArweaveLink(assetArweaveTxid);
  const fileProperties = getNftMetadataFileProperties([
    { type: "image/png", uri: assetArweaveUri },
  ]);
  const metadataToUpload = {
    ...METADATA,
    animation_url: fileProperties.animation_url,
    image: fileProperties.properties.files[0].uri,
    properties: {
      ...METADATA.properties,
      files: fileProperties.properties.files,
    },
  };
  const { txid: metadataArweaveTxid } = await uploadToArweaveUsingBundlr(
    req,
    JSON.stringify(metadataToUpload),
    [{ name: "Content-Type", value: "application/json" }]
  );

  const authorityKeypair = getAuthorityKeypair();
  const auctionHouseSdk = loadAuctionHouseSdk(CurrencyNameExpress_Enum.Solana);
  const connection = getConnection();

  return getMintMasterEditionTx(
    auctionHouseSdk,
    connection,
    authorityKeypair.publicKey,
    metadataToUpload,
    0,
    getArweaveLink(metadataArweaveTxid),
    false
  );
}

async function getTransferTx(
  mint: PublicKey,
  sourceWallet: PublicKey,
  destinationWallet: PublicKey
) {
  const connection = getConnection();
  const [[destinationAta], [sourceAta]] = await Promise.all([
    findAta(destinationWallet, mint),
    findAta(sourceWallet, mint),
  ]);
  // If the destination ATA doesn't exist, we need to create it, otherwise
  // the transfer will fail.
  const createAtaTx = await getCreateAtaTxIfNotExists(
    connection,
    destinationAta,
    mint,
    destinationWallet,
    sourceWallet
  );
  const transferIx = createTransferCheckedInstruction(
    sourceAta,
    mint,
    destinationAta,
    sourceWallet,
    1,
    0,
    []
  );
  return createAtaTx != null ? createAtaTx.add(transferIx) : ixToTx(transferIx);
}

export default async function getTooniesSwapTxEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const user = await getUserFromRequestHeaders(req);
  if (user == null) {
    throw new Error("Invalid request.");
  }

  const verifiedPublicKey = new PublicKey(user.id);
  const { nftToBeSwappedMint } = req.body;
  const {
    transaction: mintMasterEditionTx,
    mintAccount: proofOfOwnershipTokenMintAccount,
  } = await getMintProofOfOwnershipNftTx(req);
  const proofOfOwnershipTokenMintKey =
    proofOfOwnershipTokenMintAccount.publicKey;
  const authorityKeypair = getAuthorityKeypair();
  const [nftToBeSwappedTransferTx, proofOfOwnershipTokenTransferTx] =
    await Promise.all([
      getTransferTx(
        new PublicKey(nftToBeSwappedMint),
        verifiedPublicKey,
        authorityKeypair.publicKey
      ),
      getTransferTx(
        proofOfOwnershipTokenMintKey,
        authorityKeypair.publicKey,
        verifiedPublicKey
      ),
    ]);

  const combinedTx = nftToBeSwappedTransferTx.add(
    mintMasterEditionTx,
    proofOfOwnershipTokenTransferTx
  );
  combinedTx.recentBlockhash = (
    await getConnection().getLatestBlockhash("finalized")
  ).blockhash;
  combinedTx.feePayer = verifiedPublicKey;
  combinedTx.partialSign(authorityKeypair, proofOfOwnershipTokenMintAccount);

  res.json({
    tx: combinedTx.serialize({ requireAllSignatures: false }),
  });
}
