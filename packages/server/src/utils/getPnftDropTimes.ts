import PnftDropTimesFlag from "formfn-shared/dist/types/PnftDropTimesFlag";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";

const DEFAULT_PNFT_DROP_TIMES: PnftDropTimesFlag = {
  dropDuration: { unit: "weeks", value: 2 },
  reminderThreshold: { unit: "day", value: 1 },
};

export default async function getPnftDropTimes() {
  const { dropDuration, reminderThreshold } = await getLdFlag(
    LaunchDarklyFlag.PnftDropTimes,
    DEFAULT_PNFT_DROP_TIMES
  );

  return {
    dropDuration: dayjs.duration(dropDuration.value, dropDuration.unit),
    reminderThreshold: dayjs.duration(
      reminderThreshold.value,
      reminderThreshold.unit
    ),
  };
}
