import PlainButton from "components/buttons/PlainButton";
import RadioButton from "components/buttons/RadioButton";
import Body2 from "components/text/Body2";
import styles from "css/buttons/RadioButtonWithLabel.module.css";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";

type Props = {
  className?: string;
  description?: string;
  isActive: boolean;
  label: JSX.Element;
  onClick: () => void;
};

export default function RadioButtonWithLabel({
  className,
  description,
  isActive,
  label,
  onClick,
}: Props): JSX.Element {
  return (
    <PlainButton
      className={joinClasses(styles.container, className)}
      onClick={onClick}
    >
      <RadioButton isActive={isActive} />
      <div className={styles.textContainer}>
        {label}
        {description != null && (
          <Body2 textAlign="left" colorClass={ColorClass.Secondary}>
            {description}
          </Body2>
        )}
      </div>
    </PlainButton>
  );
}
