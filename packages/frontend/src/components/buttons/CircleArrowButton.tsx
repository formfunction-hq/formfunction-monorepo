import PlainButton from "components/buttons/PlainButton";
import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import ColorValue from "types/enums/ColorValue";
import styles from "css/buttons/CircleArrowButton.module.css";
import ChevronRightIcon from "components/icons/ChevronRightIcon";
import joinClasses from "utils/joinClasses";

type Props = {
  className?: string;
  direction: "left" | "right";
  disabled?: boolean;
  onClick: () => void;
};

export default function CircleArrowButton({
  className,
  direction,
  disabled = false,
  onClick,
}: Props): JSX.Element {
  return (
    <PlainButton
      className={joinClasses(styles.button, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {direction === "left" ? (
        <ChevronLeftIcon colorValue={ColorValue.White} />
      ) : (
        <ChevronRightIcon colorValue={ColorValue.White} />
      )}
    </PlainButton>
  );
}
