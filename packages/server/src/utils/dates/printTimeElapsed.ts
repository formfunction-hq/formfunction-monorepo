import { Dayjs } from "dayjs";
import dayjs from "src/utils/dates/dayjsex";
import logIfNotProd from "src/utils/logIfNotProd";

// Useful for debugging
export default function printTimeElapsed(startTime: Dayjs, label: string) {
  logIfNotProd(
    `[${label}]: took ${dayjs().diff(startTime, "second", true)} seconds`
  );
}
