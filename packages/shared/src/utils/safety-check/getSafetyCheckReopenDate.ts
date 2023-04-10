import { Dayjs } from "dayjs";
import dayjs from "utils/dates/dayjsex";

export default function getSafetyCheckReopenDate(timeOfRejection: Dayjs) {
  return timeOfRejection.add(dayjs.duration({ days: 30 }));
}
