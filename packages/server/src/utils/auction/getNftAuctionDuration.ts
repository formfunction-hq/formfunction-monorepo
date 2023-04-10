import dayjs from "src/utils/dates/dayjsex";
import { Nft, NftListing } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function getNftAuctionDuration(
  nft: Nft & { NftListing: Maybe<NftListing> }
) {
  return dayjs.duration({
    seconds: nft.NftListing!.auctionDurationInSeconds,
  });
}
