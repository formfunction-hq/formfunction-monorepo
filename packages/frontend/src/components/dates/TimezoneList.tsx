import { useEffect, useState } from "react";

import styles from "css/dates/TimezoneList.module.css";
import TimezoneObject from "formfn-shared/dist/types/TimezoneObject";
import dayjs from "utils/dates/dayjsex";
import PlainButton from "components/buttons/PlainButton";
import Body1 from "components/text/Body1";
import joinClasses from "utils/joinClasses";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import TinyLabel from "components/text/TinyLabel";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import TIMEZONES from "formfn-shared/dist/constants/Timezones";
import TextInput from "components/input/TextInput";
import ColorClass from "types/enums/ColorClass";

function TimezoneRow({
  isSelected,
  onClick,
  timezone,
}: {
  isSelected: boolean;
  onClick: () => void;
  timezone: TimezoneObject;
}): JSX.Element {
  const [currentTime, setCurrentTime] = useState(
    dayjs().tz(timezone.tzCode).format("h:mma")
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().tz(timezone.tzCode).format("h:mma"));
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <PlainButton className={styles.timezoneRowButton} onClick={onClick}>
      <Body1
        className={joinClasses(
          styles.timezoneRow,
          isSelected ? styles.selected : null
        )}
        colorClass={ColorClass.Primary}
      >
        <div>{timezone.label}</div>
        <div>{currentTime}</div>
      </Body1>
    </PlainButton>
  );
}

function TimezoneGroup({
  groupName,
  onClickTimezone,
  searchVal,
  timezones,
  tzCode,
}: {
  groupName: string;
  onClickTimezone: (tzCode: string) => void;
  searchVal: string;
  timezones: Array<TimezoneObject>;
  tzCode: string;
}): Maybe<JSX.Element> {
  const searchValRegex = new RegExp(searchVal, "i");
  const filteredTimezones = timezones.filter((timezone) =>
    searchValRegex.test(timezone.label)
  );

  if (filteredTimezones.length === 0) {
    return null;
  }

  return (
    <div>
      <TinyLabel colorClass={ColorClass.Primary} textTransform="uppercase">
        {groupName}
      </TinyLabel>
      <div className={styles.timezoneRows}>
        {filteredTimezones.map((timezone) => (
          <TimezoneRow
            key={timezone.tzCode}
            isSelected={tzCode === timezone.tzCode}
            onClick={() => onClickTimezone(timezone.tzCode)}
            timezone={timezone}
          />
        ))}
      </div>
    </div>
  );
}

type Props = {
  onClickTimezone: (tzCode: string) => void;
  searchVal: string;
  setSearchVal: (val: string) => void;
  tzCode: string;
};

export default function TimezoneList({
  onClickTimezone,
  searchVal,
  setSearchVal,
  tzCode,
}: Props): JSX.Element {
  const groupedTimezones = groupBy(TIMEZONES, (obj) => obj.group);

  return (
    <div>
      <TextInput
        autoFocus
        placeholder="Search..."
        onChange={setSearchVal}
        value={searchVal}
      />
      <div className={styles.timezones}>
        {Object.keys(groupedTimezones).map((key) => (
          <TimezoneGroup
            key={key}
            groupName={key}
            onClickTimezone={onClickTimezone}
            searchVal={searchVal}
            timezones={groupedTimezones[key]}
            tzCode={tzCode}
          />
        ))}
      </div>
    </div>
  );
}
