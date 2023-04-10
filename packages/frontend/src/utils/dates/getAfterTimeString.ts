import dayjs from "utils/dates/dayjsex";
import { Duration } from "dayjs/plugin/duration";

export default function getAfterTimeString(duration: Duration) {
  // Use startOf so that GraphQL caching is more efficient
  return dayjs().startOf("hour").subtract(duration).utc().format();
}
