import COLOR_VARIABLE_TO_DARK_MODE from "constants/dark-mode/ColorVariableToDarkMode";
import COLOR_VARIABLE_TO_LIGHT_MODE from "constants/dark-mode/ColorVariableToLightMode";
// import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ColorMode from "types/enums/ColorMode";
import ColorVariableName from "types/enums/ColorVariableName";

function getVariableName(
  colorMode: ColorMode,
  colorVariableName: string
): string {
  switch (colorMode) {
    case ColorMode.DarkMode:
      return COLOR_VARIABLE_TO_DARK_MODE[
        colorVariableName as ColorVariableName
      ];
    case ColorMode.LightMode:
      return COLOR_VARIABLE_TO_LIGHT_MODE[
        colorVariableName as ColorVariableName
      ];
    default:
      return COLOR_VARIABLE_TO_LIGHT_MODE[
        colorVariableName as ColorVariableName
      ];
    // TODO[@arcticmatt]: re-enable after issues die down
    // return assertUnreachable(colorMode);
  }
}

export default function switchToColorMode(colorMode: ColorMode) {
  const { documentElement } = document;
  Object.values(ColorVariableName).forEach((colorVariableName) => {
    documentElement.style.setProperty(
      colorVariableName,
      getComputedStyle(documentElement).getPropertyValue(
        getVariableName(colorMode, colorVariableName)
      )
    );
  });
}
