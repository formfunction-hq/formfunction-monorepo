import ColorScheme from "types/ColorScheme";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

type Color = keyof typeof ColorValue &
  keyof typeof ColorClass &
  keyof typeof BackgroundColorClass;

export default function getColorScheme(
  background: Color,
  foreground: Color,
  textColor: Color,
  buttonTheme: ButtonTheme
): ColorScheme {
  return {
    background: {
      backgroundColorClass: BackgroundColorClass[background],
      colorClass: ColorClass[background],
      colorValue: ColorValue[background],
    },
    buttonTheme,
    foreground: {
      backgroundColorClass: BackgroundColorClass[foreground],
      colorClass: ColorClass[foreground],
      colorValue: ColorValue[foreground],
    },
    textColor: {
      backgroundColorClass: BackgroundColorClass[textColor],
      colorClass: ColorClass[textColor],
      colorValue: ColorValue[textColor],
    },
  };
}
