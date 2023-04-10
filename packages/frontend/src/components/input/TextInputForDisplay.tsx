import Subheader from "components/text/Subheader";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/input/TextInputForDisplay.module.css";
import ColorClass from "types/enums/ColorClass";

type Props = {
  label: string;
  value: string;
};

export default function TextInputForDisplay({
  label,
  value,
}: Props): JSX.Element {
  return (
    <div>
      <TinyLabel
        className={styles.label}
        colorClass={ColorClass.Secondary}
        textTransform="uppercase"
      >
        {label}
      </TinyLabel>
      <Subheader className={styles.input} colorClass={ColorClass.Primary}>
        {value}
      </Subheader>
    </div>
  );
}
