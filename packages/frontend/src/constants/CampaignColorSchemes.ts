import exhaustiveStringArray from "formfn-shared/dist/utils/array/exhaustiveStringArray";
import { ExcludeFutureAddedValue } from "types/ExcludeFutureAddedValue";
import CampaignColorSchemeExpress_enum from "types/relay/CampaignColorSchemeExpress_enum";
import ColorScheme from "types/ColorScheme";
import getColorScheme from "utils/colors/getColorScheme";
import ButtonTheme from "types/enums/ButtonTheme";

const CAMPAIGN_COLOR_SCHEMES: Array<
  ExcludeFutureAddedValue<CampaignColorSchemeExpress_enum>
> = exhaustiveStringArray<
  ExcludeFutureAddedValue<CampaignColorSchemeExpress_enum>
>()(
  "AliceBlueSinopia",
  "AntiFlashWhiteDarkGunmetal",
  "BrightGrayMediumBlue",
  "GreenishGrayMidnightBlue",
  "CulturedCadmiumGreen",
  "SeashellMaximumRed"
);

export const CAMPAIGN_COLOR_SCHEMES_TO_COLORS: Record<
  ExcludeFutureAddedValue<CampaignColorSchemeExpress_enum>,
  ColorScheme
> = {
  AliceBlueSinopia: getColorScheme(
    "AliceBlue",
    "Sinopia",
    "Primary",
    ButtonTheme.Sinopia
  ),
  AntiFlashWhiteDarkGunmetal: getColorScheme(
    "AntiFlashWhite",
    "DarkGunmetal",
    "Primary",
    ButtonTheme.DarkGunmetal
  ),
  BrightGrayMediumBlue: getColorScheme(
    "BrightGray",
    "MediumBlue",
    "Primary",
    ButtonTheme.MediumBlue
  ),
  CulturedCadmiumGreen: getColorScheme(
    "Cultured",
    "CadmiumGreen",
    "White",
    ButtonTheme.CadmiumGreen
  ),
  GreenishGrayMidnightBlue: getColorScheme(
    "GreenishGray",
    "MidnightBlue",
    "White",
    ButtonTheme.MidnightBlue
  ),
  SeashellMaximumRed: getColorScheme(
    "Seashell",
    "MaximumRed",
    "Primary",
    ButtonTheme.MaximumRed
  ),
};

export default CAMPAIGN_COLOR_SCHEMES;
