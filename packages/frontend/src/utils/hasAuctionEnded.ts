import { Dayjs } from "dayjs";
import dayjs from "utils/dates/dayjsex";

export default function hasAuctionEnded(auctionEndTime: Dayjs): boolean {
  return dayjs().isAfter(auctionEndTime);
}
