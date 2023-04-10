import styles from "css/buttons/ToggleButtons.module.css";
import joinClasses from "utils/joinClasses";
import FontClass from "types/enums/FontClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import Toggle from "components/buttons/Toggle";

export type ToggleOption = {
  name: string;
  value: boolean;
};

type Props = {
  fontClass?: FontClass;
  label: string;
  onChange: (toggles: Array<ToggleOption>) => void;
  textButtonTheme?: TextButtonTheme;
  toggleDisabled?: boolean;
  toggles: Array<ToggleOption>;
};

export default function ToggleButtons({
  fontClass = FontClass.NavLink,
  label,
  toggles,
  onChange,
  textButtonTheme = TextButtonTheme.Primary,
  toggleDisabled,
}: Props) {
  const onTextClickChangeHandler = () => {
    if (toggleDisabled === true) {
      return;
    }

    const hasDisabledToggle = toggles.some((toggle) => toggle.value === false);
    const newToggles = toggles.map((toggle) => ({
      name: toggle.name,
      value: hasDisabledToggle,
    }));

    onChange(newToggles);
  };

  const onToggleChangeHandler = (toggle: ToggleOption) => {
    if (toggleDisabled === true) {
      return;
    }
    const newToggle = { name: toggle.name, value: !toggle.value };
    const newToggles = toggles.map((t) =>
      t.name === toggle.name ? newToggle : t
    );
    onChange(newToggles);
  };
  return (
    <div className={styles.container}>
      <TextButton
        buttonThemeOrColorClass={textButtonTheme}
        className={joinClasses(styles.label, fontClass)}
        onClick={onTextClickChangeHandler}
        textDecoration="none"
      >
        {label}
      </TextButton>
      <div className={styles.toggles}>
        {toggles.map((toggle) => (
          <Toggle
            key={`${label}-${toggle.name}`}
            enabled={toggle.value}
            onChange={() => onToggleChangeHandler(toggle)}
          />
        ))}
      </div>
    </div>
  );
}
