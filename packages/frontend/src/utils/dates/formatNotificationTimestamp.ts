import { Dayjs } from "dayjs";
import formatDayjsDateAsDateAtTime from "utils/dates/formatDayjsDateAsDateAtTime";

export default function formatNotificationTimestamp(timestamp: Dayjs): string {
  return formatDayjsDateAsDateAtTime(timestamp);
}
