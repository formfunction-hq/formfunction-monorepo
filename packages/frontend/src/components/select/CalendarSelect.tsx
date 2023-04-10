import { Dayjs } from "dayjs";
import styles from "css/select/CalendarSelect.module.css";
import ColorValue from "types/enums/ColorValue";
import Calendar from "components/dates/Calendar";
import { Popover } from "antd";
import { useState } from "react";
import ChevronDownIcon from "components/icons/ChevronDownIcon";

type Props = {
  date: Dayjs;
  maxDate: Dayjs;
  minDate: Dayjs;
  onChange: (val: Dayjs) => void;
};

function PopoverContent({ date, maxDate, minDate, onChange }: Props) {
  return (
    <Calendar
      date={date}
      maxDate={maxDate}
      minDate={minDate}
      onChange={onChange}
    />
  );
}

export default function CalendarSelect({
  date,
  maxDate,
  minDate,
  onChange,
}: Props): JSX.Element {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      content={
        <PopoverContent
          date={date}
          maxDate={maxDate}
          minDate={minDate}
          onChange={(val) => {
            onChange(val);
            setVisible(false);
          }}
        />
      }
      placement="topLeft"
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <div className={styles.select}>
        <div className={styles.selectText}>{date.format("MM/DD/YY")}</div>
        <ChevronDownIcon colorValue={ColorValue.Primary} size={24} />
      </div>
    </Popover>
  );
}
