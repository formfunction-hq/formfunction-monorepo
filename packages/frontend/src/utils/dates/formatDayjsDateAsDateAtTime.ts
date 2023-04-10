import dayjs from "utils/dates/dayjsex";

export default function formatDayjsDateAsDateAtTime(
  dateAsDayjs: dayjs.Dayjs
): string {
  return dateAsDayjs.format("MMM D, YYYY [at] h:mma");
}
