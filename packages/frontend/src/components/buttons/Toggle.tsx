import styles from "css/buttons/Toggle.module.css";

type Props = {
  enabled: boolean;
  onChange: () => void;
};

export default function Toggle({ enabled, onChange }: Props) {
  return (
    <label className={styles.switch}>
      <input
        checked={enabled}
        className={styles.switchInput}
        onChange={onChange}
        type="checkbox"
      />
      <span className={styles.slider} />
    </label>
  );
}
