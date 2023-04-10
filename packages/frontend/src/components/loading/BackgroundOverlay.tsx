import ElementId from "types/enums/ElementId";
import joinClasses from "utils/joinClasses";
import styles from "css/loading/BackgroundOverlay.module.css";
import ColorValue from "types/enums/ColorValue";
import BackgroundOverlayTheme from "types/enums/BackgroundOverlayTheme";
import useColorModeContext from "hooks/useColorModeContext";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

type Props = {
  children?: JSX.Element | Array<JSX.Element>;
  className?: string;
  theme?: BackgroundOverlayTheme;
};

function getStylesForTheme(
  theme: BackgroundOverlayTheme,
  isLightMode: boolean
) {
  const defaultStyles = { backgroundColor: ColorValue.BackgroundOverlay };

  switch (theme) {
    case BackgroundOverlayTheme.AssetExpansion:
      return isLightMode
        ? {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }
        : defaultStyles;
    case BackgroundOverlayTheme.Default:
      return defaultStyles;
    case BackgroundOverlayTheme.SensitiveContent:
      return {
        backdropFilter: "blur(10px)",
        backgroundColor: "var(--color-backgroundOverlayDark)",
      };
    default:
      return assertUnreachable(theme);
  }
}

export default function BackgroundOverlay({
  children,
  className,
  theme = BackgroundOverlayTheme.Default,
}: Props): JSX.Element {
  const { isLightMode } = useColorModeContext();

  return (
    <div
      className={joinClasses(styles.backgroundOverlay, className)}
      id={ElementId.BackgroundOverlay}
      style={getStylesForTheme(theme, isLightMode)}
    >
      {children}
    </div>
  );
}
