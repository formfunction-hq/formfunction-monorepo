import { Dayjs } from "dayjs";
import dayjs from "utils/dates/dayjsex";

export default function getDayjsFromDateAndTime(
  date: Dayjs,
  time: Dayjs,
  tzCode: string
): Dayjs {
  const dateFormat = "YYYY/MM/DD";
  const timeFormat = "HH:mm";
  return dayjs.tz(
    `${date.format(dateFormat)} ${time.format(timeFormat)}`,
    `${dateFormat} ${timeFormat}`,
    tzCode
  );
}
