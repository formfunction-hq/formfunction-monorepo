import CheckboxButton from "components/buttons/CheckboxButton";
import PlainButton from "components/buttons/PlainButton";
import TextInput from "components/input/TextInput";
import styles from "css/buttons/CheckboxButtonWithTextInput.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  className?: string;
  isActive: boolean;
  onChange: (val: string) => void;
  onClick: () => void;
  placeholder?: string;
  value: string;
};

export default function CheckboxButtonWithTextInput({
  className,
  isActive,
  onChange,
  onClick,
  placeholder,
  value,
}: Props): JSX.Element {
  return (
    <PlainButton
      className={joinClasses(styles.container, className)}
      onClick={onClick}
    >
      <CheckboxButton isActive={isActive} />
      <TextInput
        className={styles.textInput}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </PlainButton>
  );
}
