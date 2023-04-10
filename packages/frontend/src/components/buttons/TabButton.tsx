import styles from "css/buttons/TabButton.module.css";
import PlainButton from "components/buttons/PlainButton";
import joinClasses from "utils/joinClasses";
import Body1Medium from "components/text/Body1Medium";
import ColorClass from "types/enums/ColorClass";
import ButtonName from "types/enums/ButtonName";
import COLOR_CLASS_TO_COLOR_VALUE from "utils/colors/ColorClassToColorValue";
import GlobalClass from "types/enums/GlobalClass";
import ColorValue from "types/enums/ColorValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  activeColorClass?: ColorClass;
  buttonName?: ButtonName;
  flexGrow?: boolean;
  isActive: boolean;
  label?: Maybe<string | number>;
  name: string;
  onClick: () => void;
};

export default function TabButton({
  activeColorClass,
  buttonName,
  flexGrow = false,
  isActive = false,
  label,
  name,
  onClick,
}: Props) {
  const activeClass =
    activeColorClass != null ? activeColorClass : GlobalClass.GradientText;
  const activeValue =
    activeColorClass != null
      ? COLOR_CLASS_TO_COLOR_VALUE[activeColorClass]
      : ColorValue.BrightPurple;

  return (
    <PlainButton
      buttonName={buttonName}
      className={joinClasses(
        styles.tab,
        isActive ? styles.tabActive : null,
        flexGrow ? styles.grow : null
      )}
      onClick={onClick}
      style={{
        borderBottomColor: isActive ? activeValue : undefined,
      }}
    >
      <Body1Medium colorClass={ColorClass.Primary}>
        <span className={isActive ? activeClass : undefined}>{name}</span>
      </Body1Medium>
      {label != null && label !== "" && (
        <Body1Medium className={styles.label} colorClass={ColorClass.Secondary}>
          <span className={isActive ? activeClass : undefined}>{label}</span>
        </Body1Medium>
      )}
    </PlainButton>
  );
}
