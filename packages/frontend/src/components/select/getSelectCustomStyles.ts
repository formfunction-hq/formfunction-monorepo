import { StylesConfig } from "react-select";
import ColorValue from "types/enums/ColorValue";

const BORDER_RADIUS = 16;
const FONT_FAMILY = "DM Sans";
const WIDTH = "100%";

export default function getSelectCustomStyles({
  fontSize = 18,
  hasError = false,
  height = 54,
  showCursor = true,
}: {
  fontSize?: number;
  hasError?: boolean;
  height?: number;
  showCursor?: boolean;
}): StylesConfig<{ label: string; value: string }, false> {
  return {
    container: (provided) => ({
      ...provided,
      marginTop: 2,
    }),
    control: (provided) => ({
      ...provided,
      "&:hover": {
        border: `1px solid ${hasError ? ColorValue.Error : ColorValue.Ghost}`,
      },
      backgroundColor: "transparent",
      border: `1px solid ${hasError ? ColorValue.Error : ColorValue.Tertiary}`,
      borderColor: hasError ? ColorValue.Error : ColorValue.Tertiary,
      borderRadius: BORDER_RADIUS,
      boxShadow: "none",
      fontFamily: FONT_FAMILY,
      fontSize,
      fontWeight: 400,
      height,
      paddingLeft: 4,
      width: WIDTH,
    }),
    input: (provided) => ({
      ...provided,
      // To disable blinking text input cursor https://stackoverflow.com/a/51504285
      ...(showCursor
        ? {
            color: ColorValue.Primary,
          }
        : {
            color: "transparent",
            textShadow: `0 0 0 ${ColorValue.Primary}`,
          }),
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: BORDER_RADIUS,
      marginTop: 10,
      // Needed because we're applying a border-radius
      // 1. To make border-radius apply over scrollbar
      // 2. To make option hover states not overflow the border radius
      overflow: "hidden",
      padding: 0,
      width: WIDTH,
      zIndex: 900,
    }),
    menuList: (provided) => ({
      ...provided,
      paddingBottom: 0,
      paddingTop: 0,
    }),
    menuPortal: (provided) => ({
      ...provided,
      left: "inherit",
      top: "inherit",
      zIndex: 900,
    }),
    option: (provided, state) => ({
      ...provided,
      ...(state.isSelected
        ? {
            backgroundColor: ColorValue.LightPurple,
            color: ColorValue.Primary,
          }
        : { backgroundColor: ColorValue.MenuPopup, color: ColorValue.Primary }),
      "&:hover": !state.isSelected
        ? {
            backgroundColor: ColorValue.Tertiary,
            color: ColorValue.Primary,
          }
        : {},
      fontFamily: FONT_FAMILY,
      fontSize,
      fontWeight: 400,
      height: 42,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: ColorValue.Ghost,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: ColorValue.Primary,
    }),
  };
}
