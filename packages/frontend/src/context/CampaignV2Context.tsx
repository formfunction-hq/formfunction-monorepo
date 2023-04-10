/* eslint-disable react-hooks/exhaustive-deps */
import { CAMPAIGN_COLOR_SCHEMES_TO_COLORS } from "constants/CampaignColorSchemes";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useColorModeContext from "hooks/useColorModeContext";
import { Context, createContext, useState } from "react";
import ColorScheme from "types/ColorScheme";
import ColorMode from "types/enums/ColorMode";
import LocalStorageKey from "types/enums/LocalStorageKey";
import ButtonTheme from "types/enums/ButtonTheme";
import CampaignColorSchemeExpress_enum from "types/relay/CampaignColorSchemeExpress_enum";
import getColorScheme from "utils/colors/getColorScheme";
import getLocalStorage from "utils/local-storage/getLocalStorage";

const DARK_MODE_COLORS = getColorScheme(
  "WebsiteBackground",
  "BrightPurple",
  "Primary",
  ButtonTheme.BrightPurpleOutlineWebsiteBackground
);
const DEFAULT_COLOR_SCHEME = "AntiFlashWhiteDarkGunmetal";
const IS_INITIALLY_DARK_MODE =
  getLocalStorage(LocalStorageKey.ColorMode) === ColorMode.DarkMode;

export type CampaignV2ContextData = {
  colorScheme: CampaignColorSchemeExpress_enum;
  colorSchemeColors: ColorScheme;
  setColorScheme: (val: CampaignColorSchemeExpress_enum) => void;
};

export const CampaignV2Context: Context<CampaignV2ContextData> =
  createContext<CampaignV2ContextData>({
    colorScheme: DEFAULT_COLOR_SCHEME,
    colorSchemeColors: IS_INITIALLY_DARK_MODE
      ? DARK_MODE_COLORS
      : CAMPAIGN_COLOR_SCHEMES_TO_COLORS[DEFAULT_COLOR_SCHEME],
    setColorScheme: emptyFunction,
  });

function getColorSchemeColors(
  colorScheme: CampaignColorSchemeExpress_enum,
  isDarkMode: boolean
) {
  if (isDarkMode) {
    return DARK_MODE_COLORS;
  }

  return colorScheme === RELAY_FUTURE_ADDED_VALUE
    ? CAMPAIGN_COLOR_SCHEMES_TO_COLORS[DEFAULT_COLOR_SCHEME]
    : CAMPAIGN_COLOR_SCHEMES_TO_COLORS[colorScheme];
}

type ProviderProps = {
  children: any;
  defaultColorScheme?: CampaignColorSchemeExpress_enum;
};

export function CampaignV2ContextProvider({
  children,
  defaultColorScheme = DEFAULT_COLOR_SCHEME,
}: ProviderProps): JSX.Element {
  const { isDarkMode } = useColorModeContext();
  const [colorScheme, setColorScheme] =
    useState<CampaignColorSchemeExpress_enum>(defaultColorScheme);

  return (
    <CampaignV2Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        colorScheme,
        colorSchemeColors: getColorSchemeColors(colorScheme, isDarkMode),
        setColorScheme,
      }}
    >
      {children}
    </CampaignV2Context.Provider>
  );
}
