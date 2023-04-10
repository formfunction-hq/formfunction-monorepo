import dayjs from "src/utils/dates/dayjsex";

export default function getTimeDifferenceFromNowAsDuration(date: Date) {
  return dayjs.duration(dayjs().diff(dayjs(date)));
}
