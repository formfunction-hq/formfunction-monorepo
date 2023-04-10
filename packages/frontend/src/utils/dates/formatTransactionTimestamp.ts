import dayjs from "utils/dates/dayjsex";
import formatDayjsDateAsDateAtTime from "utils/dates/formatDayjsDateAsDateAtTime";

export default function formatTransactionTimestamp(timestamp: string): string {
  const date = dayjs(timestamp);
  return formatDayjsDateAsDateAtTime(date);
}
