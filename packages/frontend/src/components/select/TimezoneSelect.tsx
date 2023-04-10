import BodyText from "components/text/BodyText";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import getTimezoneLabel from "utils/dates/getTimezoneLabel";
import styles from "css/select/TimezoneSelect.module.css";
import { useState } from "react";
import CalendarIcon from "components/icons/CalendarIcon";
import TimezoneList from "components/dates/TimezoneList";
import { Popover } from "antd";

function PopoverContent({
  onHide,
  setTzCode,
  tzCode,
}: {
  onHide: () => void;
  setTzCode: (val: string) => void;
  tzCode: string;
}) {
  const [searchVal, setSearchVal] = useState("");
  const onClickTimezone = (val: string) => {
    setSearchVal("");
    setTzCode(val);
    onHide();
  };

  return (
    <div className={styles.timezoneListContainer}>
      <TimezoneList
        onClickTimezone={onClickTimezone}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        tzCode={tzCode}
      />
    </div>
  );
}

type Props = {
  fontClass?: FontClass;
  setTzCode: (val: string) => void;
  tzCode: string;
};

export default function TimezoneSelect({
  fontClass = FontClass.Body2,
  setTzCode,
  tzCode,
}: Props): JSX.Element {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      content={
        <PopoverContent
          onHide={() => setVisible(false)}
          setTzCode={setTzCode}
          tzCode={tzCode}
        />
      }
      onVisibleChange={setVisible}
      placement="topLeft"
      trigger="click"
      visible={visible}
    >
      <div className={styles.container}>
        <CalendarIcon colorValue={ColorValue.Secondary} />
        <BodyText colorClass={ColorClass.Primary} fontClass={fontClass}>
          {getTimezoneLabel(tzCode)}
        </BodyText>
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          fontClass={fontClass}
        >
          Change
        </TextButton>
      </div>
    </Popover>
  );
}
