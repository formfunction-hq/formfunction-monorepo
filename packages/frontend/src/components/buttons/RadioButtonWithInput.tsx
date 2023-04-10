import PlainButton from "components/buttons/PlainButton";
import RadioButton from "components/buttons/RadioButton";
import HideIfEmpty from "components/containers/HideIfEmpty";
import FlexBox from "components/layout/FlexBox";
import Body2 from "components/text/Body2";
import NavLink from "components/text/NavLink";
import styles from "css/buttons/RadioButtonWithInput.module.css";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";

type Props = {
  buttonDescription?: string;
  buttonLabel: JSX.Element | string;
  className?: string;
  input: JSX.Element;
  isActive: boolean;
  onClick: () => void;
  showInputOnActiveOnly?: boolean;
};

export default function RadioButtonWithInput({
  className,
  buttonLabel,
  buttonDescription,
  isActive,
  input,
  onClick,
  showInputOnActiveOnly = true,
}: Props): JSX.Element {
  return (
    <FlexBox
      className={joinClasses(styles.container, className)}
      alignItems="flex-start"
      flexDirection="column"
      gap={12}
    >
      <PlainButton
        className={joinClasses(styles.radioButtonContainer)}
        onClick={onClick}
      >
        <RadioButton isActive={isActive} />
        <FlexBox alignItems="flex-start" flexDirection="column" gap={8}>
          {typeof buttonLabel === "string" ? (
            <NavLink textAlign="left" colorClass={ColorClass.Primary}>
              {buttonLabel}
            </NavLink>
          ) : (
            buttonLabel
          )}
          {buttonDescription != null && (
            <Body2 textAlign="left" colorClass={ColorClass.Secondary}>
              {buttonDescription}
            </Body2>
          )}
        </FlexBox>
      </PlainButton>
      <HideIfEmpty className={styles.inputContainer}>
        {showInputOnActiveOnly === false ||
          (showInputOnActiveOnly === true && isActive && input)}
      </HideIfEmpty>
    </FlexBox>
  );
}
