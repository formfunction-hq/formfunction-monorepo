import { DurationUnitType } from "dayjs/plugin/duration";

type DurationUnitAndValue = { unit: DurationUnitType; value: number };

type PnftDropTimesFlag = {
  dropDuration: DurationUnitAndValue;
  reminderThreshold: DurationUnitAndValue;
};

export default PnftDropTimesFlag;
