import PlainButton from "components/buttons/PlainButton";
import { range } from "formfn-shared/dist/utils/range";
import styles from "css/buttons/BigToggleButton.module.css";
import BodyText from "components/text/BodyText";
import ComponentSize from "types/enums/ComponentSize";
import joinClasses from "utils/joinClasses";
import FontClass from "types/enums/FontClass";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ColorClass from "types/enums/ColorClass";

function getToggleSizeClass(componentSize: ComponentSize | undefined) {
  switch (componentSize) {
    case ComponentSize.Small:
      return {
        toggle: styles.toggleSmall,
        toggleHighlight: styles.toggleHighlightSmall,
      };
    case undefined:
      return {
        toggle: "",
        toggleHighlight: "",
      };
    default:
      return assertUnreachable(componentSize);
  }
}

type Props = {
  labels: Array<string | JSX.Element>;
  onToggle: (val: number) => void;
  position: number;
  size?: ComponentSize;
};

export default function BigToggleButton({
  labels,
  onToggle,
  position,
  size,
}: Props): JSX.Element {
  const numToggles = labels.length;
  const toggleButtons = range(numToggles).map((val) => (
    <PlainButton
      key={val}
      className={styles.toggleButton}
      onClick={() => onToggle(val)}
    >
      <BodyText
        colorClass={null}
        className={position === val ? styles.textWhite : ColorClass.Primary}
        fontClass={size ? FontClass.Body1Medium : FontClass.NavLink}
      >
        {labels[val]}
      </BodyText>
    </PlainButton>
  ));

  return (
    <div
      className={joinClasses(styles.toggle, getToggleSizeClass(size).toggle)}
      style={{ gridTemplateColumns: `repeat(${numToggles}, minmax(0, 1fr))` }}
    >
      <div
        className={joinClasses(
          styles.toggleHighlight,
          getToggleSizeClass(size).toggleHighlight
        )}
        style={{
          left: `calc((7px * (2 * ${position} + 1) + ((${
            100 / numToggles
          }% - 14px) * ${position}))`,
          width: `calc(${100 / numToggles}% - 14px)`,
        }}
      />
      {toggleButtons}
    </div>
  );
}
