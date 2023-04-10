import styles from "css/buttons/ToggleButtonForColorMode.module.css";
import joinClasses from "utils/joinClasses";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import useColorModeContext from "hooks/useColorModeContext";
import ColorMode from "types/enums/ColorMode";
import FontClass from "types/enums/FontClass";
import useBreakpoint from "hooks/useBreakpoint";

export default function ToggleButtonForColorMode() {
  const { isDarkMode, setColorMode } = useColorModeContext();
  const onChangeHandler = () => {
    setColorMode(isDarkMode ? ColorMode.LightMode : ColorMode.DarkMode);
  };
  const { isMobileBreakpoint } = useBreakpoint();

  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        <input
          checked={isDarkMode}
          className={styles.switchInput}
          onChange={onChangeHandler}
          type="checkbox"
        />
        <span className={styles.slider} />
      </label>
      {!isMobileBreakpoint && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.White}
          className={joinClasses(styles.label, FontClass.NavLink)}
          onClick={onChangeHandler}
          textDecoration="none"
        >
          {isDarkMode ? "Dark" : "Light"} Mode
        </TextButton>
      )}
    </div>
  );
}
