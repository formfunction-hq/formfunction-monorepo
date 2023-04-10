import { Dayjs } from "dayjs";
import dayjs from "src/utils/dates/dayjsex";

export default function isDiscordAuthorizationNonceExpired(expiration: Dayjs) {
  return dayjs().isAfter(expiration);
}
