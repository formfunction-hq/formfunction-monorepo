import { Duration } from "dayjs/plugin/duration";
import dayjs from "utils/dates/dayjsex";

export default function isPnftDropExpired(
  startTime: dayjs.ConfigType,
  dropDuration: Duration
) {
  const dropEndTime = dayjs(startTime).add(dropDuration);
  return dayjs().isAfter(dropEndTime);
}
