import TinyLabel from "components/text/TinyLabel";
import styles from "css/text/NewPill.module.css";

export default function NewPill() {
  return (
    <TinyLabel className={styles.icon} colorClass={null}>
      NEW
    </TinyLabel>
  );
}
