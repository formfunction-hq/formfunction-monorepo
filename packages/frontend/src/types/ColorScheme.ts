import BackgroundColorClass from "types/enums/BackgroundColorClass";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

type Colors = {
  backgroundColorClass: BackgroundColorClass;
  colorClass: ColorClass;
  colorValue: ColorValue;
};

type ColorScheme = {
  background: Colors;
  buttonTheme: ButtonTheme;
  foreground: Colors;
  textColor: Colors;
};

export default ColorScheme;
