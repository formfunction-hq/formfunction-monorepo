/* eslint-disable react-hooks/exhaustive-deps */
import { Context, createContext, useEffect, useState } from "react";
import ColorMode from "types/enums/ColorMode";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import getLocalStorage from "utils/local-storage/getLocalStorage";
import LocalStorageKey from "types/enums/LocalStorageKey";
import setLocalStorage from "utils/local-storage/setLocalStorage";
import switchToColorMode from "utils/dark-mode/switchToColorMode";
import logEvent from "utils/analytics/logEvent";
import AnalyticsEvent from "types/enums/AnalyticsEvent";

export type ColorModeContextData = {
  colorMode: ColorMode;
  isDarkMode: boolean;
  isLightMode: boolean;
  setColorMode: (val: ColorMode) => void;
};

export const ColorModeContext: Context<ColorModeContextData> =
  createContext<ColorModeContextData>({
    colorMode: ColorMode.LightMode,
    isDarkMode: false,
    isLightMode: false,
    setColorMode: emptyFunction,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function ColorModeContextProvider(props: ProviderProps): JSX.Element {
  const [colorMode, setColorMode] = useState(
    (getLocalStorage(LocalStorageKey.ColorMode) as ColorMode) ??
      ColorMode.LightMode
  );

  useEffect(() => {
    switchToColorMode(colorMode);
  }, []);

  return (
    <ColorModeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        colorMode,
        isDarkMode: colorMode === ColorMode.DarkMode,
        isLightMode: colorMode === ColorMode.LightMode,
        setColorMode: (val) => {
          logEvent(AnalyticsEvent.ColorModeChange, {
            colorMode: val,
          });
          setColorMode(val);
          setLocalStorage(LocalStorageKey.ColorMode, val);
          switchToColorMode(val);
        },
      }}
    >
      {props.children}
    </ColorModeContext.Provider>
  );
}
