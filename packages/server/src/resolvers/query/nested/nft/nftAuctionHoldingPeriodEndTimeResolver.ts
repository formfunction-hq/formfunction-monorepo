import { NftExpress } from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import AUCTION_END_BUFFER from "src/constants/AuctionEndBuffer";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

async function nftAuctionHoldingPeriodEndTimeResolver(
  nft: NftExpress
): Promise<Maybe<string>> {
  return nft.auctionEndTime == null
    ? null
    : dayjs(nft.auctionEndTime).add(AUCTION_END_BUFFER).utc().format();
}

export default nftAuctionHoldingPeriodEndTimeResolver;
