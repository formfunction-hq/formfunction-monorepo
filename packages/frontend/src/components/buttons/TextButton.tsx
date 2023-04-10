/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import ButtonName from "types/enums/ButtonName";
import FontClass from "types/enums/FontClass";
import GlobalClass from "types/enums/GlobalClass";
import { Link } from "react-router-dom";
import { MouseEventHandler } from "react";
import TextButtonTheme from "types/enums/TextButtonTheme";
import joinClasses from "utils/joinClasses";
import styles from "css/buttons/TextButton.module.css";
import logEvent from "utils/analytics/logEvent";
import ColorClass from "types/enums/ColorClass";
import getLinkWithProtocol from "formfn-shared/dist/utils/links/getLinkWithProtocol";

const THEME_TO_CLASS_NAME = {
  [TextButtonTheme.BrightPurple]: styles.buttonBrightPurple,
  [TextButtonTheme.Error]: styles.buttonError,
  [TextButtonTheme.Navy]: styles.buttonNavy,
  [TextButtonTheme.PopheadzDarkGray]: styles.buttonPopheadzDarkGray,
  [TextButtonTheme.Primary]: styles.buttonPrimary,
  [TextButtonTheme.PurpleGradient]: styles.buttonPurpleGradient,
  [TextButtonTheme.Secondary]: styles.buttonSecondary,
  [TextButtonTheme.White]: styles.buttonWhite,
};

const THEME_TO_ACTIVE_CLASS_NAME = {
  [TextButtonTheme.BrightPurple]: styles.buttonBrightPurpleActive,
  [TextButtonTheme.Error]: styles.buttonErrorActive,
  [TextButtonTheme.Navy]: styles.buttonNavyActive,
  [TextButtonTheme.PopheadzDarkGray]: styles.buttonPopheadzDarkGrayActive,
  [TextButtonTheme.Primary]: styles.buttonPrimaryActive,
  [TextButtonTheme.PurpleGradient]: styles.buttonPurpleGradientActive,
  [TextButtonTheme.Secondary]: styles.buttonSecondaryActive,
  [TextButtonTheme.White]: styles.buttonWhiteActive,
};

type Props = {
  buttonName?: ButtonName;
  buttonThemeOrColorClass?: keyof typeof THEME_TO_CLASS_NAME | ColorClass;
  children: string | Array<string> | JSX.Element;
  className?: string;
  disabled?: boolean;
  display?: "block" | "flex" | "inline";
  fontClass?: FontClass;
  href?: string;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  isActive?: boolean;
  logProperties?: { [key: string]: any };
  onClick?: MouseEventHandler;
  target?: string;
  textDecoration?: "none" | "underline";
  textTransform?: "none" | "uppercase";
  type?: "button" | "link_external" | "link_internal" | "submit";
};

export default function TextButton({
  buttonName,
  buttonThemeOrColorClass: buttonTheme = TextButtonTheme.Navy,
  children,
  className,
  disabled = false,
  display = "flex",
  fontClass,
  href,
  icon,
  iconPosition = "left",
  isActive = false,
  logProperties,
  onClick,
  target = "_blank",
  textDecoration,
  textTransform,
  type = "button",
}: Props): JSX.Element {
  const buttonThemeClass =
    buttonTheme in TextButtonTheme
      ? THEME_TO_CLASS_NAME[buttonTheme as TextButtonTheme]
      : buttonTheme;
  const buttonThemeActiveClass = !isActive
    ? null
    : buttonTheme in TextButtonTheme
    ? THEME_TO_ACTIVE_CLASS_NAME[buttonTheme as TextButtonTheme]
    : buttonTheme;

  const classNameJoined = joinClasses(
    styles.button,
    className,
    buttonThemeClass,
    buttonThemeActiveClass,
    fontClass
  );
  const style = {
    display,
    ...(textTransform == null ? {} : { textTransform }),
    ...(textDecoration == null ? {} : { textDecoration }),
  };

  const childrenWithIcon = (
    <>
      {icon && iconPosition === "left" && (
        <div
          className={joinClasses(
            styles.icon,
            styles.iconLeft,
            GlobalClass.HideText
          )}
        >
          {icon}
        </div>
      )}
      {/* Purple gradient theme only works if we apply here */}
      <div
        className={joinClasses(buttonThemeClass, buttonThemeActiveClass)}
        // Gradient breaks on mobile if we don't include display: 'inline'... idk why
        style={{ ...style, display: "inline" }}
      >
        {children}
      </div>
      {icon && iconPosition === "right" && (
        <div
          className={joinClasses(
            styles.icon,
            styles.iconRight,
            GlobalClass.HideText
          )}
        >
          {icon}
        </div>
      )}
    </>
  );

  const onClickWithLog: MouseEventHandler = (e) => {
    if (buttonName != null) {
      logEvent(AnalyticsEvent.ButtonClick, { buttonName, ...logProperties });
    }
    if (onClick != null) {
      onClick(e);
    }
  };

  if (type === "link_internal") {
    return (
      <Link style={{ textDecoration: "none" }} to={href ?? ""}>
        <div className={classNameJoined} onClick={onClickWithLog} style={style}>
          {childrenWithIcon}
        </div>
      </Link>
    );
  }

  if (type === "link_external") {
    const hrefToUse = href == null ? "" : getLinkWithProtocol(href);

    return (
      <a
        className={classNameJoined}
        href={hrefToUse}
        onClick={onClickWithLog}
        style={style}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
      >
        {childrenWithIcon}
      </a>
    );
  }

  return (
    <button
      className={classNameJoined}
      disabled={disabled}
      onClick={onClickWithLog}
      style={style}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {childrenWithIcon}
    </button>
  );
}
