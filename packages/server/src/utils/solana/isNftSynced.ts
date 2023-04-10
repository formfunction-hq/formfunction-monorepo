import { NftListing } from "@prisma/client";
import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import dayjs from "dayjs";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { NftStatusExpress_Enum } from "src/__generated__/generated";
import areOwnersSynced from "src/utils/solana/areOwnersSynced";

export type OnchainNftType = {
  ownerId: Maybe<string>;
  price?: Maybe<number>;
  status: NftStatusExpress_Enum;
};

export type PrismaNftType = {
  NftListing: Maybe<NftListing>;
  mint: string;
  ownerId: string;
  status: string;
};

function compareStatuses(
  prismaStatus: string,
  onchainStatus: NftStatusExpress_Enum,
  scheduledAuctionTime: MaybeUndef<Date>,
  auctionEndTime: MaybeUndef<Date>
) {
  return (
    // Technically, an NFT that has a scheduled listing is the same on-chain as an NFT that is listed.
    // The "scheduled" part is managed off-chain.
    (prismaStatus === NftStatusExpress_Enum.ListingScheduled &&
      onchainStatus === NftStatusExpress_Enum.Listed) ||
    // Handles the case where a scheduled auction has started, but has no bids
    (prismaStatus === NftStatusExpress_Enum.Auction &&
      onchainStatus === NftStatusExpress_Enum.Listed &&
      scheduledAuctionTime != null &&
      auctionEndTime != null &&
      dayjs().isAfter(scheduledAuctionTime) &&
      dayjs().isBefore(auctionEndTime)) ||
    onchainStatus === prismaStatus
  );
}

/**
 * Checks if an NFT's state in our DB is in sync with the actual on-chain state.
 */
export default async function isNftSynced(
  prismaNft: PrismaNftType,
  onchainNft: OnchainNftType,
  auctionHouseSdk: AuctionHouseSdk
): Promise<boolean> {
  const { auctionEndTime, priceInLamports, scheduledAuctionTime } =
    prismaNft.NftListing ?? {};
  return (
    (await areOwnersSynced(
      prismaNft.mint,
      prismaNft.ownerId,
      onchainNft.ownerId,
      auctionHouseSdk
    )) &&
    (onchainNft.price?.toString() ?? "") ===
      (priceInLamports?.toString() ?? "") &&
    compareStatuses(
      prismaNft.status,
      onchainNft.status,
      scheduledAuctionTime,
      auctionEndTime
    )
  );
}
