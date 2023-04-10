import { PublicKey } from "@solana/web3.js";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import getAssetPathFromFormfunctionAssetSrc from "src/utils/asset/getAssetPathFromFormfunctionAssetSrc";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getPrisma from "src/utils/prisma/getPrisma";
import parseTxWithTransfer from "src/utils/solana/txs/parse/parseTxWithTransfer";
import {
  InsertNftInput,
  NftMetadataV1Input,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
  ShareInfoAndSwapForTooniesInput,
  ShareInfoAndSwapForTooniesResponse,
} from "src/__generated__/generated";
import getConnection from "src/utils/solana/getConnection";
import deleteNft from "src/utils/nft/deleteNft";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import getOnchainNftMetadata from "formfn-shared/dist/utils/solana/metaplex/getOnchainNftMetadata";
import getArweaveTxidFromLink from "formfn-shared/dist/utils/getArweaveTxidFromLink";
import axios from "axios";
import parseCreateMintTx from "src/utils/solana/txs/parse/parseCreateMintTx";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

async function assertCanSwap(
  mint: PublicKey,
  swapTxid: string,
  viewerId: string
) {
  // TODO: may also want to add check that nft indicated by `mint`
  // is not burned to prevent double swaps
  const existingTooniesShippingInfoRecord =
    await getPrisma().tooniesShippingInfo.findUnique({
      where: { swappedNftMint: mint.toString() },
    });
  if (existingTooniesShippingInfoRecord != null) {
    throw new Error("The NFT has already been swapped");
  }

  const tx = await ConnectionWrapper.getParsedTransaction(
    swapTxid,
    "confirmed"
  );
  if (tx == null) {
    throw new Error("The specified transaction does not exist");
  }
  const [mostRecentTransferTx, mostRecentMintTx] = await Promise.all([
    parseTxWithTransfer(tx, mint),
    parseCreateMintTx(tx),
  ]);
  if (
    mostRecentTransferTx == null ||
    mostRecentMintTx == null ||
    mostRecentTransferTx.txid !== mostRecentMintTx.txid ||
    mostRecentTransferTx.fromAddress !== viewerId
  ) {
    throw new Error(
      "The NFT to be swapped was not transferred by the signed in viewer"
    );
  }

  return mostRecentMintTx;
}

// TODO: Update to using prod data later, probably a KV store with
// all of these pre-defined per token variant
export const MEDIA_URL =
  "https://firebasestorage.googleapis.com/v0/b/formfn-ed6b4.appspot.com/o/nft-images/OG_Heart.png";
export const MEDIA_STORAGE_PATH =
  getAssetPathFromFormfunctionAssetSrc(MEDIA_URL)!;
export const METADATA: NftMetadataV1Input = {
  description: "Proof of ownership token for OG Heart",
  name: "Proof of Ownership • Heart",
  properties: {
    category: "image",
    creators: [
      {
        address: getAuthorityKeypair().publicKey.toString(),
        share: 100,
        verified: true,
      },
    ],
  },
  seller_fee_basis_points: 500,
  symbol: "",
};

export default async function shareInfoAndSwapForTooniesResolver(
  context: MyContext,
  input: ShareInfoAndSwapForTooniesInput
): Promise<ShareInfoAndSwapForTooniesResponse> {
  const verifiedPublicKey = assertUserSignedRequest(context);
  const viewerId = verifiedPublicKey.toString();
  const { email, name, shippingAddress, swappedNftMint, swapTxid } = input;
  const prisma = getPrisma();
  const mintKey = new PublicKey(swappedNftMint);

  const swapTx = await assertCanSwap(mintKey, swapTxid, viewerId);
  const connection = getConnection();
  const { metadata: existingMetadata } = await getOnchainNftMetadata(
    connection,
    new PublicKey(swappedNftMint)
  );
  const metadataArweaveTxid = getArweaveTxidFromLink(
    // This value can contain null bytes (\x00) and our DB throws
    // if we attempt to store this in a "Text" field
    existingMetadata.data.uri.replaceAll("\x00", "")
  );
  const existingArweaveMetadata = (await axios(existingMetadata.data.uri)).data;
  const assetArweaveTxid = getArweaveTxidFromLink(
    existingArweaveMetadata.image
  );
  const proofOfOwnershipTokenMintKey = new PublicKey(swapTx.mint);

  // TODO: also need to update update_authority -- perhaps do async?
  // TODO(maybe): refactor to use transaction client
  // TODO: fill in later
  const creatorId = getAuthorityKeypair().publicKey.toString();
  const insertNftInput: InsertNftInput = {
    assetArweaveTxid,
    // Assume assets are square and use 1000x1000 for now
    assetHeight: 1000,
    assetWidth: 1000,
    contentType: "image/png",
    creatorId,
    creatorsMetadataString: JSON.stringify(METADATA.properties.creators),
    description: METADATA.description,
    image: MEDIA_STORAGE_PATH,
    metadataArweaveTxid,
    mint: proofOfOwnershipTokenMintKey.toString(),
    name: METADATA.name,
    ownerId: viewerId,
    sellerFeeBasisPoints: METADATA.seller_fee_basis_points,
    status: NftStatusExpress_Enum.Owned,
  };
  // 3a. Insert proof of ownership token NFT to DB
  const { updatedNft: insertedNft } = await insertNftTransaction(context.req, {
    creatorId,
    fromUserId: creatorId,
    insertNftInput,
    mint: proofOfOwnershipTokenMintKey.toString(),
    toUserId: creatorId,
    txid: swapTx.txid!,
    type: NftTransactionTypeExpress_Enum.Minted,
  });

  // 3b. Create the TooniesShippingInfo row
  await prisma.tooniesShippingInfo.create({
    data: {
      // TODO: replace with prod value
      ProofOfOwnershipTokenNft: { connect: { id: insertedNft!.mint } },
      User: { connect: { id: viewerId } },
      email,
      name,
      shippingAddress,
      swappedNftMint,
      // TODO: replace with prod value
      type: "",
    },
  });

  // 3c. Delete swapped NFT from our DB
  await deleteNft(swappedNftMint);

  return {
    __typename: Typename.ShareInfoAndSwapForTooniesResponse,
    proofOfOwnershipTokenMetadataAccount: convertNftToMetadataAccount(
      insertedNft!
    ),
  };
}
