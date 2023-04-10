/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MouseEventHandler, forwardRef, CSSProperties } from "react";

import AnalyticsEvent from "types/enums/AnalyticsEvent";
import ButtonName from "types/enums/ButtonName";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import GlobalClass from "types/enums/GlobalClass";
import { Link } from "react-router-dom";
import joinClasses from "utils/joinClasses";
import styles from "css/buttons/ButtonWithText.module.css";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import logEvent from "utils/analytics/logEvent";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import FlexBox from "components/layout/FlexBox";
import AnchorTarget from "types/AnchorTarget";

type Props = {
  buttonName?: ButtonName;
  buttonTheme: ButtonTheme;
  children: string | JSX.Element | Array<string | JSX.Element>;
  className?: string;
  disabled?: boolean;
  fontClass: FontClass;
  height?: number;
  href?: string;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  logProperties?: { [key: string]: any };
  onClick?: MouseEventHandler;
  style?: CSSProperties;
  target?: AnchorTarget;
  textTransform?: "none" | "uppercase";
  type?: "button" | "link_external" | "link_internal" | "submit";
  width?: "auto" | "100%";
};

// TODO: Not everything is right
const BUTTON_THEME_TO_SPINNER_COLOR = {
  [ButtonTheme.BrightPurpleOutline]: ColorValue.White,
  [ButtonTheme.BrightPurpleOutlineWebsiteBackground]: ColorValue.White,
  [ButtonTheme.LightPinkOutline]: ColorValue.White,
  [ButtonTheme.Navy]: ColorValue.White,
  [ButtonTheme.NavyOutline]: ColorValue.White,
  [ButtonTheme.NavyOutlineSquare]: ColorValue.White,
  [ButtonTheme.PurpleGradient]: ColorValue.White,
  [ButtonTheme.PurpleOutline]: ColorValue.White,
  [ButtonTheme.Red]: ColorValue.White,
  [ButtonTheme.RedOutline]: ColorValue.White,
  [ButtonTheme.SecondaryOutline]: ColorValue.White,
  [ButtonTheme.White]: ColorValue.Primary,
  [ButtonTheme.WhiteOutline]: ColorValue.White,
  [ButtonTheme.WhiteWithPurpleGradient]: ColorValue.BrightPurple,
};

function getClassNameForButtonTheme(
  buttonTheme: ButtonTheme,
  isLink: boolean,
  disabled: boolean
): string {
  switch (buttonTheme) {
    case ButtonTheme.BrightPurpleOutline:
      return joinClasses(
        isLink
          ? styles.brightPurpleOutlineThemeLink
          : styles.brightPurpleOutlineTheme,
        styles.outlineTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.BrightPurpleOutlineWebsiteBackground:
      return joinClasses(
        isLink
          ? styles.brightPurpleOutlineWebsiteBackgroundThemeLink
          : styles.brightPurpleOutlineWebsiteBackgroundTheme,
        styles.outlineTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.CadmiumGreen:
      return joinClasses(
        isLink ? styles.cadmiumGreenThemeLink : styles.cadmiumGreenTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.DarkGunmetal:
      return joinClasses(
        isLink ? styles.darkGunmetalThemeLink : styles.darkGunmetalTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.LightPinkOutline:
      return joinClasses(
        isLink
          ? styles.lightPinkOutlineThemeLink
          : styles.lightPinkOutlineTheme,
        styles.outlineTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.MaximumRed:
      return joinClasses(
        isLink ? styles.maximumRedThemeLink : styles.maximumRedTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.MediumBlue:
      return joinClasses(
        isLink ? styles.mediumBlueThemeLink : styles.mediumBlueTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.MidnightBlue:
      return joinClasses(
        isLink ? styles.midnightBlueThemeLink : styles.midnightBlueTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.Navy:
      return joinClasses(
        isLink ? styles.navyThemeLink : styles.navyTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.NavyOutline:
      return joinClasses(
        isLink ? styles.navyOutlineThemeLink : styles.navyOutlineTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.NavyOutlineSquare:
      return joinClasses(
        isLink
          ? styles.navyOutlineSquareThemeLink
          : styles.navyOutlineSquareTheme,
        styles.outlineTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.PurpleGradient:
      return joinClasses(
        isLink ? styles.purpleGradientThemeLink : styles.purpleGradientTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.PurpleOutline:
      return joinClasses(
        isLink ? styles.purpleOutlineThemeLink : styles.purpleOutlineTheme,
        styles.outlineTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.Red:
      return joinClasses(
        isLink ? styles.redThemeLink : styles.redTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.RedOutline:
      return joinClasses(
        isLink ? styles.redOutlineThemeLink : styles.redOutlineTheme,
        styles.outlineTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.SecondaryOutline:
      return joinClasses(
        isLink
          ? styles.secondaryOutlineThemeLink
          : styles.secondaryOutlineTheme,
        styles.outlineTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.Sinopia:
      return joinClasses(
        isLink ? styles.sinopiaThemeLink : styles.sinopiaTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.White:
      return joinClasses(
        isLink ? styles.whiteThemeLink : styles.whiteTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.WhiteOutline:
      return joinClasses(
        isLink ? styles.whiteOutlineThemeLink : styles.whiteOutlineTheme,
        styles.outlineTheme,
        disabled ? styles.disabled : null
      );
    case ButtonTheme.WhiteWithPurpleGradient:
      return joinClasses(
        isLink
          ? styles.whiteWithPurpleGradientThemeLink
          : styles.whiteWithPurpleGradientTheme,
        disabled ? styles.disabled : null
      );
    default:
      return assertUnreachable(buttonTheme);
  }
}

const ButtonWithText = forwardRef<HTMLButtonElement, Props>(
  (
    {
      buttonName,
      buttonTheme,
      children,
      className,
      disabled = false,
      fontClass,
      height,
      href,
      icon,
      iconPosition = "right",
      logProperties,
      onClick,
      isLoading = false,
      style = {},
      target = "_blank",
      textTransform,
      type = "button",
      width = "auto",
    }: Props,
    ref
  ) => {
    const styleToUse = {
      ...style,
      height,
      ...(textTransform == null ? {} : { textTransform }),
    };
    const classNameJoined = joinClasses(
      getClassNameForButtonTheme(
        buttonTheme,
        type === "link_internal" || type === "link_external",
        disabled
      ),
      styles.button,
      width === "auto" ? styles.buttonAutoWidth : undefined,
      fontClass,
      className
    );
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
        <FlexBox flexDirection="column">
          {isLoading && (
            <LoadingSpinner
              // @ts-ignore should clean this up later...
              colorValue={BUTTON_THEME_TO_SPINNER_COLOR[buttonTheme]}
              // @ts-ignore should clean this up later...
              fontClass={fontClass}
            />
          )}
          <div
            // Do this to keep the width of the button the same even if LoadingSpinner is rendered
            className={joinClasses(isLoading ? styles.hideChildren : undefined)}
          >
            {children}
          </div>
        </FlexBox>
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
        <Link className={styles.linkInternal} to={href ?? ""}>
          <div
            className={joinClasses(classNameJoined, styles.linkContent)}
            onClick={onClickWithLog}
            style={styleToUse}
          >
            {childrenWithIcon}
          </div>
        </Link>
      );
    }

    if (type === "link_external") {
      return (
        <a
          className={joinClasses(classNameJoined, styles.linkContent)}
          href={href ?? ""}
          onClick={onClickWithLog}
          style={styleToUse}
          target={target}
          rel={target === "_blank" ? "noreferrer" : undefined}
        >
          {childrenWithIcon}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classNameJoined}
        disabled={disabled || isLoading}
        onClick={onClickWithLog}
        style={styleToUse}
        // eslint-disable-next-line react/button-has-type
        type={type}
      >
        {childrenWithIcon}
      </button>
    );
  }
);

export default ButtonWithText;
