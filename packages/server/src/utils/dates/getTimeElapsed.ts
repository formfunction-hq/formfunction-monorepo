import dayjs from "src/utils/dates/dayjsex";

export default function getTimeElapsed(startTime: dayjs.Dayjs) {
  return {
    durationInMinutes: dayjs().diff(startTime, "minute", true),
    durationInSeconds: dayjs().diff(startTime, "second", true),
  };
}
