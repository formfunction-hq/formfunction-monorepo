import { Duration } from "dayjs/plugin/duration";

export default function formatPnftDropDuration(duration: Duration) {
  const weeks = duration.asWeeks();
  if (weeks > 1) {
    return `${weeks} weeks`;
  }

  const days = duration.asDays();
  if (days > 1) {
    return `${days} days`;
  }

  const hours = duration.asHours();
  if (hours > 1) {
    return `${hours} hours`;
  }

  return `${duration.asMinutes().toString()} minutes`;
}
