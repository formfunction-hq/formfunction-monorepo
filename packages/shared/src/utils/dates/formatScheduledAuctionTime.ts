import TIMEZONES from "constants/Timezones";
import assertUnreachable from "utils/assertUnreachable";
import dayjs from "utils/dates/dayjsex";

export default function formatScheduledAuctionTime(
  timestamp: string,
  formatType: "long" | "short"
): string {
  const date = dayjs(timestamp);

  switch (formatType) {
    case "long": {
      const tzCode = dayjs.tz.guess();
      const tzLabel =
        TIMEZONES.find(({ tzCode: tzCodeInner }) => tzCode === tzCodeInner)
          ?.label ?? tzCode;
      return `${date.format("MMM D, YYYY [at] h:mma")} (${tzLabel})`;
    }
    case "short": {
      return date.format("MMM D, h:mma");
    }
    default:
      return assertUnreachable(formatType);
  }
}
