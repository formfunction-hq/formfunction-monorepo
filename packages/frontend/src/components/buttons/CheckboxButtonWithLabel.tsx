import { CSSProperties } from "react";
import CheckboxButton from "components/buttons/CheckboxButton";
import PlainButton from "components/buttons/PlainButton";
import BodyText from "components/text/BodyText";
import styles from "css/buttons/CheckboxButtonWithLabel.module.css";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";

type Props = {
  className?: string;
  colorClass?: ColorClass;
  columnGap?: number;
  enableLabelOnClick?: boolean;
  fontClass?: FontClass;
  isActive: boolean;
  label: string | JSX.Element;
  noBorder?: boolean;
  onClick: () => void;
  style?: CSSProperties;
};

/**
 * TODO[@arcticmatt]: consider refactoring. See discussion here https://github.com/formfunction-hq/formfn-monorepo/pull/3185#discussion_r1038374210
 * for more details.
 */
export default function CheckboxButtonWithLabel({
  className,
  colorClass = ColorClass.Primary,
  columnGap = 16,
  enableLabelOnClick = true,
  fontClass = FontClass.NavLink,
  isActive,
  label,
  noBorder = false,
  onClick,
  style = {},
}: Props): JSX.Element {
  const styleToUse = {
    ...style,
    columnGap,
  };

  const labelElem = (
    <BodyText
      className={styles.label}
      fontClass={fontClass}
      colorClass={colorClass}
    >
      {label}
    </BodyText>
  );

  if (enableLabelOnClick) {
    return (
      <PlainButton
        className={joinClasses(
          styles.container,
          className,
          noBorder === true ? styles.noBorder : null
        )}
        onClick={onClick}
        style={styleToUse}
      >
        <CheckboxButton isActive={isActive} />
        {labelElem}
      </PlainButton>
    );
  }
  return (
    <div
      className={joinClasses(
        styles.container,
        className,
        noBorder === true ? styles.noBorder : null
      )}
      style={styleToUse}
    >
      <PlainButton onClick={onClick}>
        <CheckboxButton isActive={isActive} />
      </PlainButton>
      {labelElem}
    </div>
  );
}
