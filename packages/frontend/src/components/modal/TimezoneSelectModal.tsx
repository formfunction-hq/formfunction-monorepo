import { useState } from "react";

import styles from "css/modal/TimezoneSelectModal.module.css";
import GenericModal from "components/modal/GenericModal";
import TimezoneList from "components/dates/TimezoneList";

type Props = {
  isShown: boolean;
  onHide: () => void;
  setTzCode: (val: string) => void;
  tzCode: string;
};

export default function TimezoneSelectModal({
  isShown,
  onHide,
  setTzCode,
  tzCode,
}: Props): JSX.Element {
  const [searchVal, setSearchVal] = useState("");
  const onClickTimezone = (val: string) => {
    setSearchVal("");
    setTzCode(val);
    onHide();
  };

  return (
    <GenericModal
      className={styles.genericModal}
      isShown={isShown}
      onHide={() => {
        setSearchVal("");
        onHide();
      }}
    >
      <TimezoneList
        onClickTimezone={onClickTimezone}
        searchVal={searchVal}
        setSearchVal={setSearchVal}
        tzCode={tzCode}
      />
    </GenericModal>
  );
}
