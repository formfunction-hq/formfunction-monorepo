import shiftByTimezoneDiff from "utils/dates/shiftByTimezoneDiff";
import styles from "css/time/DateAndTimePicker.module.css";
import dayjs from "utils/dates/dayjsex";
import { Dayjs } from "dayjs";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import TimezoneSelect from "components/select/TimezoneSelect";
import CalendarSelect from "components/select/CalendarSelect";
import TimeSelect from "components/select/TimeSelect";

function shouldUseMinDate(dateMaybe: Maybe<Dayjs>, minDate: Dayjs) {
  const date = dateMaybe ?? dayjs();
  return date.dayOfYear() === minDate.dayOfYear();
}

type Props = {
  date: Dayjs;
  maxDaysAhead: number;
  setDate: (val: Dayjs) => void;
  setTime: (val: Maybe<Dayjs>) => void;
  setTzCode: (val: string) => void;
  showErrors: boolean;
  time: Maybe<Dayjs>;
  tzCode: string;
};

export default function DateAndTimePicker({
  date,
  maxDaysAhead,
  time,
  setDate,
  setTime,
  setTzCode,
  showErrors,
  tzCode,
}: Props) {
  const maxDate = shiftByTimezoneDiff(
    dayjs().add(maxDaysAhead, "day"),
    dayjs.tz.guess(),
    tzCode
  );
  const minDate = shiftByTimezoneDiff(dayjs(), dayjs.tz.guess(), tzCode);

  const resetTimeIfInPast = (dateInner: Dayjs, tzCodeInner: string) => {
    const minDateInner = shiftByTimezoneDiff(
      dayjs(),
      dayjs.tz.guess(),
      tzCodeInner
    );

    // If newly selected time is in the past, reset the time
    if (
      time != null &&
      time.isBefore(minDateInner) &&
      shouldUseMinDate(dateInner, minDateInner)
    ) {
      setTime(null);
    }
  };

  return (
    <div className={styles.inputs}>
      <div className={styles.timezoneSelectContainer}>
        <TimezoneSelect
          setTzCode={(val) => {
            setTzCode(val);
            resetTimeIfInPast(date, val);
          }}
          tzCode={tzCode}
        />
      </div>
      <div className={styles.dateAndTimeInputs}>
        <div className={styles.dateAndTimeInput}>
          <CalendarSelect
            date={date}
            maxDate={maxDate}
            minDate={minDate}
            onChange={(val) => {
              setDate(val);
              resetTimeIfInPast(val, tzCode);
            }}
          />
        </div>
        <div className={styles.dateAndTimeInput}>
          <TimeSelect
            hasError={showErrors && time == null}
            minDate={
              !shouldUseMinDate(date, minDate)
                ? undefined
                : {
                    hour: minDate.hour(),
                    minute: minDate.minute(),
                  }
            }
            onChange={setTime}
            value={time}
          />
        </div>
      </div>
    </div>
  );
}
