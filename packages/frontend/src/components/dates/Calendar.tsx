import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import ChevronRightIcon from "components/icons/ChevronRightIcon";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import ReactCalendar from "react-calendar";
import dayjs from "utils/dates/dayjsex";
import joinClasses from "utils/joinClasses";
import styles from "css/dates/Calendar.module.css";
import { Dayjs } from "dayjs";

type Props = {
  date: Dayjs;
  maxDate: Dayjs;
  minDate: Dayjs;
  onChange: (date: Dayjs) => void;
};

export default function Calendar({
  date,
  maxDate,
  minDate,
  onChange,
}: Props): JSX.Element {
  return (
    <div>
      <ReactCalendar
        calendarType="US"
        formatShortWeekday={(_locale, dateInner) =>
          dayjs(dateInner).format("dd")
        }
        maxDate={maxDate.toDate()}
        maxDetail="month"
        minDate={minDate.toDate()}
        minDetail="month"
        nextLabel={<ChevronRightIcon colorValue={ColorValue.Primary} />}
        next2Label={null}
        onChange={(val: Date) => {
          onChange(dayjs(val));
        }}
        prevLabel={<ChevronLeftIcon colorValue={ColorValue.Primary} />}
        prev2Label={null}
        selectRange={false}
        tileClassName={({ date: dateInner, view }) =>
          view === "month" &&
          dayjs(dateInner)
            .startOf("day")
            .isSameOrAfter(minDate.startOf("day")) &&
          dayjs(dateInner).startOf("day").isBefore(maxDate.startOf("day"))
            ? joinClasses(styles.dayAvailable, FontClass.Body2Medium)
            : joinClasses(styles.dayUnavailable, FontClass.Body2Medium)
        }
        value={date.toDate()}
        view="month"
      />
    </div>
  );
}
