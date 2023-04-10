import CustomSelect from "components/select/CustomSelect";
import { Dayjs } from "dayjs";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { range } from "formfn-shared/dist/utils/range";
import useBreakpoint from "hooks/useBreakpoint";
import useFlagsTyped from "hooks/useFlagsTyped";
import { useMemo } from "react";
import dayjs from "utils/dates/dayjsex";

const START_OF_DAY = dayjs().startOf("day");

type Props = {
  hasError: boolean;
  minDate?: {
    hour: number;
    minute: number;
  };
  onChange: (val: Dayjs) => void;
  value: Maybe<Dayjs>;
};

export default function TimeSelect({
  hasError,
  minDate,
  onChange,
  value,
}: Props): JSX.Element {
  const { timeSelectMinScheduleTimeMinutes, timeSelectNumIncrements } =
    useFlagsTyped();
  // We let people choose times in X-minute increments (e.g. 12:00am, 12:30am, 1:00am, etc...)
  const options: Array<{ label: string; value: string }> = useMemo(
    () =>
      range(timeSelectNumIncrements).map((val) => {
        const date = START_OF_DAY.add(
          val *
            (dayjs.duration(1, "day").asMinutes() / timeSelectNumIncrements),
          "minute"
        );
        return {
          label: date.format("h:mma"),
          value: date.toString(),
        };
      }),
    [timeSelectNumIncrements]
  );
  const { isMobileBreakpoint } = useBreakpoint();

  return (
    <CustomSelect
      hasError={hasError}
      menuPlacement="top"
      onChange={(selectedOption) => {
        const { value: valueInner } = selectedOption as {
          label: string;
          value: string;
        };
        onChange(dayjs(valueInner));
      }}
      options={options.filter((option) => {
        if (minDate == null) {
          return true;
        }

        const minDateDayjs = START_OF_DAY.minute(minDate.minute).hour(
          minDate.hour
        );
        const optionDayjs = dayjs(option.value);

        return (
          optionDayjs.diff(minDateDayjs, "minute", true) >=
          timeSelectMinScheduleTimeMinutes
        );
      })}
      placeholder={isMobileBreakpoint ? "Time" : "Choose a time"}
      value={
        value == null
          ? null
          : options.find((opt) => {
              const optDayjs = dayjs(opt.value);
              return (
                optDayjs.minute() === value.minute() &&
                optDayjs.hour() === value.hour()
              );
            })
      }
    />
  );
}
