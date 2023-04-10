import { Dayjs } from "dayjs";
import dayjs from "utils/dates/dayjsex";

/**
 * Example usage:
 *
 * input:
 * - 2020-06-01 22:00, timezone is America/Los_Angeles
 * - America/Los_Angeles
 * - America/New_York
 *
 * output: a time that is 3 hours ahead
 *
 * Note that the output's timezone is the same as the input's timezone! I.e. Dayjs.tz() is never
 * called.
 */
export default function shiftByTimezoneDiff(
  date: Dayjs,
  oldTimezone: string,
  newTimezone: string
): Dayjs {
  const offsetDiff =
    dayjs().tz(newTimezone).utcOffset() - dayjs().tz(oldTimezone).utcOffset();
  const minutesToAdd = dayjs.duration({ minutes: offsetDiff });
  return date.add(minutesToAdd);
}
