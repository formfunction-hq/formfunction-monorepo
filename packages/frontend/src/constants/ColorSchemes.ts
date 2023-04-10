import ColorScheme from "types/ColorScheme";
import ButtonTheme from "types/enums/ButtonTheme";
import getColorScheme from "utils/colors/getColorScheme";

const COLOR_SCHEMES: Array<ColorScheme> = [
  getColorScheme("Scheme11", "Scheme12", "Primary", ButtonTheme.DarkGunmetal),
  getColorScheme("Scheme21", "Scheme22", "Primary", ButtonTheme.DarkGunmetal),
  getColorScheme("Scheme31", "Scheme32", "White", ButtonTheme.DarkGunmetal),
  getColorScheme("Scheme41", "Scheme42", "White", ButtonTheme.DarkGunmetal),
  getColorScheme("Scheme51", "Scheme52", "Primary", ButtonTheme.DarkGunmetal),
  getColorScheme("Scheme61", "Scheme62", "Primary", ButtonTheme.DarkGunmetal),
];

export default COLOR_SCHEMES;
