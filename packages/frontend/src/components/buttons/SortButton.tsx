import Popover from "antd/lib/popover";
import TextButton from "components/buttons/TextButton";
import NavLink from "components/text/NavLink";
import styles from "css/buttons/SortButton.module.css";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import { useState } from "react";
import ChevronDownIcon from "components/icons/ChevronDownIcon";

type SortOrder = string;

function PopoverContent({
  humanReadableSortOrder,
  options,
  setSortOrder,
  setVisible,
}: {
  humanReadableSortOrder: Record<string, string>;
  options: Array<SortOrder>;
  setSortOrder: (val: SortOrder) => void;
  setVisible: (val: boolean) => void;
}): JSX.Element {
  return (
    <div className={styles.popoverContent}>
      {options.map((sortOrder) => (
        <TextButton
          className={styles.sortOrderTextButton}
          key={sortOrder}
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.NavLink}
          onClick={() => {
            setSortOrder(sortOrder);
            setVisible(false);
          }}
        >
          {humanReadableSortOrder[sortOrder] ?? sortOrder}
        </TextButton>
      ))}
    </div>
  );
}

type Props = {
  humanReadableSortOrder: Record<string, string>;
  options: Array<SortOrder>;
  setSortOrder: (val: SortOrder) => void;
  sortOrder: SortOrder;
};

export default function SortButton({
  humanReadableSortOrder,
  options,
  setSortOrder,
  sortOrder,
}: Props): JSX.Element {
  const [visible, setVisible] = useState(false);

  return (
    <Popover
      placement="bottomRight"
      content={
        <PopoverContent
          humanReadableSortOrder={humanReadableSortOrder}
          options={options}
          setSortOrder={setSortOrder}
          setVisible={setVisible}
        />
      }
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <div className={styles.button}>
        <NavLink colorClass={ColorClass.Primary}>
          Sort by: {humanReadableSortOrder[sortOrder] ?? sortOrder}
        </NavLink>
        <ChevronDownIcon colorValue={ColorValue.Primary} size={24} />
      </div>
    </Popover>
  );
}
