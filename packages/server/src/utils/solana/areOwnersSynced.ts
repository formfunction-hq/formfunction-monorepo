import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import { PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function areOwnersSynced(
  mint: string,
  dbNftOwnerId: Maybe<string>,
  onchainNftOwnerId: Maybe<string>,
  auctionHouseSdk: AuctionHouseSdk
) {
  const ownersAlreadySynced = dbNftOwnerId === onchainNftOwnerId;

  if (ownersAlreadySynced) {
    return ownersAlreadySynced;
  }

  // Check if onchain owner is an edition distributor. If so, we
  // are ok if Prisma's owner (which should be the NFT's creator) is out-of-sync.
  const mintKey = new PublicKey(mint);
  const [editionDistributor] = await auctionHouseSdk.findEditionDistributor(
    mintKey
  );
  return onchainNftOwnerId === editionDistributor.toString();
}
