import PlainButton from "components/buttons/PlainButton";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/nav/ProgressBarItem.module.css";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";

function Circle({ isFilled }: { isFilled: boolean }): JSX.Element {
  return (
    <div
      className={joinClasses(
        styles.circle,
        isFilled
          ? BackgroundColorClass.BrightPurple
          : BackgroundColorClass.Ghost
      )}
    />
  );
}

type Props = {
  isFilled: boolean;
  name: string;
  onClick: () => void;
};

export default function ProgressBarItem({
  isFilled,
  name,
  onClick,
}: Props): JSX.Element {
  return (
    <PlainButton onClick={onClick}>
      <div className={styles.item}>
        <TinyLabel
          colorClass={isFilled ? ColorClass.BrightPurple : ColorClass.Secondary}
          textAlign="center"
          textTransform="uppercase"
        >
          {name}
        </TinyLabel>
        <Circle isFilled={isFilled} />
      </div>
    </PlainButton>
  );
}
