import styles from "css/buttons/ToggleButton.module.css";
import joinClasses from "utils/joinClasses";
import FontClass from "types/enums/FontClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import Toggle from "components/buttons/Toggle";

type Props = {
  enabled: boolean;
  fontClass?: FontClass;
  label: string;
  onChange: (isEnabled: boolean) => void;
  textButtonTheme?: TextButtonTheme;
  toggleDisabled?: boolean;
};

export default function ToggleButton({
  enabled,
  fontClass = FontClass.NavLink,
  label,
  onChange,
  textButtonTheme = TextButtonTheme.Primary,
  toggleDisabled,
}: Props) {
  const onChangeHandler = () => {
    if (toggleDisabled === true) {
      return;
    }

    onChange(!enabled);
  };

  return (
    <div className={styles.container}>
      <Toggle enabled={enabled} onChange={onChangeHandler} />
      <TextButton
        buttonThemeOrColorClass={textButtonTheme}
        className={joinClasses(styles.label, fontClass)}
        onClick={onChangeHandler}
        textDecoration="none"
      >
        {label}
      </TextButton>
    </div>
  );
}
