import { Nft, NftListing, NftMetadata, NftTransaction } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import getGumdropConfigAuthority from "src/utils/keypairs/getGumdropConfigAuthority";
import createClaimsForAuctionBidders from "src/utils/claims/createClaimsForAuctionBidders";
import getClaimantsForPnft from "src/utils/claims/getClaimantsForPnft";
import updateClaimsWithProof from "src/utils/claims/updateClaimsWithProof";
import loadGumdropSdk from "src/utils/solana/loadGumdropSdk";
import createNotificationsForClaimants from "src/utils/claims/createNotificationsForClaimants";
import { Request } from "express";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

export type UpdatePnftDistributorInfo = {
  auctionNft: Nft & {
    NftListing: Maybe<NftListing>;
    NftMetadata: NftMetadata;
  };
  nftTransaction: NftTransaction;
  pnftIdForAuction: string;
};

export default async function updateDistributorWithNewClaimants(
  req: Request,
  { auctionNft, nftTransaction, pnftIdForAuction }: UpdatePnftDistributorInfo
) {
  const prisma = getPrisma();
  // Set the drop to active if it is not yet
  if (auctionNft.NftListing?.isPnftDropActive !== true) {
    await prisma.nftListing.update({
      data: { isPnftDropActive: true },
      where: { nftId: auctionNft.mint },
    });
  }

  const { mint, creatorId, auctionCount } = nftTransaction;

  const createdClaims = await createClaimsForAuctionBidders(mint, auctionCount);
  const claimants = await getClaimantsForPnft(auctionNft);

  const sdk = loadGumdropSdk();
  const transaction = await sdk.updateDistributorTx(
    {
      configAuthority: sdk.gumdropConfigAuthority,
      creatorAuthority: new PublicKey(creatorId),
      mint: new PublicKey(pnftIdForAuction),
      payer: sdk.gumdropConfigAuthority,
      wallet: sdk.gumdropConfigAuthority,
    },
    {
      claimants,
    }
  );

  const txid = await ConnectionWrapper.sendAndConfirmTransaction(transaction, [
    getGumdropConfigAuthority(),
  ]);

  await updateClaimsWithProof(pnftIdForAuction, mint, claimants);

  await createNotificationsForClaimants(
    auctionNft,
    pnftIdForAuction,
    createdClaims.map((claim) => claim.userId)
  );

  return txid;
}
