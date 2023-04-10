import { NftStatusExpress_Enum } from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

export default function hasAuctionEndedForNft(
  status: NftStatusExpress_Enum,
  auctionEndTime: MaybeUndef<Date>
): boolean {
  if (auctionEndTime == null) {
    return false;
  }

  return (
    status === NftStatusExpress_Enum.Auction &&
    dayjs().isSameOrAfter(dayjs(auctionEndTime))
  );
}
