import { Dayjs } from "dayjs";
import dayjs from "utils/dates/dayjsex";

export default function isNftInTimeExtensionPeriod(
  timeExtensionDurationInSeconds: number,
  auctionEndTime: Dayjs
): boolean {
  const diff = auctionEndTime.diff(dayjs(), "second", true);

  return diff < timeExtensionDurationInSeconds;
}
