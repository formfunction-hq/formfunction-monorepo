import styles from "css/input/InputWithLabel.module.css";

type Props = {
  hideInput?: boolean;
  input: JSX.Element;
  label: JSX.Element;
};

export default function InputWithLabel({
  hideInput,
  input,
  label,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      {label}
      {hideInput ? null : input}
    </div>
  );
}
