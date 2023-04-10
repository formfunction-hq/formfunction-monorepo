import ColorVariableDarkModeName from "types/enums/ColorVariableDarkModeName";
import ColorVariableName from "types/enums/ColorVariableName";

// This ensures that if we add a variable to ColorVariables.css, we must add it to
// ColorVariablesDarkMode.css (otherwise, TypeScript will complain
// after yarn gen-colors is run).
const COLOR_VARIABLE_TO_DARK_MODE: {
  [key in ColorVariableName]: ColorVariableDarkModeName;
} = {
  [ColorVariableName.ArtistPillShadow]:
    ColorVariableDarkModeName.ArtistPillShadow,
  [ColorVariableName.BackgroundOverlay]:
    ColorVariableDarkModeName.BackgroundOverlay,
  [ColorVariableName.BackgroundOverlayDark]:
    ColorVariableDarkModeName.BackgroundOverlayDark,
  [ColorVariableName.BlueGradient]: ColorVariableDarkModeName.BlueGradient,
  [ColorVariableName.BrightPurple]: ColorVariableDarkModeName.BrightPurple,
  [ColorVariableName.CardBackground]: ColorVariableDarkModeName.CardBackground,
  [ColorVariableName.ClickableAreaBackground]:
    ColorVariableDarkModeName.ClickableAreaBackground,
  [ColorVariableName.DarkCerulean]: ColorVariableDarkModeName.DarkCerulean,
  [ColorVariableName.DarkPurple]: ColorVariableDarkModeName.DarkPurple,
  [ColorVariableName.Dimmer]: ColorVariableDarkModeName.Dimmer,
  [ColorVariableName.Error]: ColorVariableDarkModeName.Error,
  [ColorVariableName.FloatingElement]:
    ColorVariableDarkModeName.FloatingElement,
  [ColorVariableName.Footer]: ColorVariableDarkModeName.Footer,
  [ColorVariableName.Ghost]: ColorVariableDarkModeName.Ghost,
  [ColorVariableName.Green]: ColorVariableDarkModeName.Green,
  [ColorVariableName.GreenGradient]: ColorVariableDarkModeName.GreenGradient,
  [ColorVariableName.LightBlue]: ColorVariableDarkModeName.LightBlue,
  [ColorVariableName.LightPink]: ColorVariableDarkModeName.LightPink,
  [ColorVariableName.LightPurple]: ColorVariableDarkModeName.LightPurple,
  [ColorVariableName.LightPurpleGradient]:
    ColorVariableDarkModeName.LightPurpleGradient,
  [ColorVariableName.LightPurpleVerticalGradient]:
    ColorVariableDarkModeName.LightPurpleVerticalGradient,
  [ColorVariableName.LightPurpleHover]:
    ColorVariableDarkModeName.LightPurpleHover,
  [ColorVariableName.LinkWater]: ColorVariableDarkModeName.LinkWater,
  [ColorVariableName.MenuPopup]: ColorVariableDarkModeName.MenuPopup,
  [ColorVariableName.Navy]: ColorVariableDarkModeName.Navy,
  [ColorVariableName.NavyHover]: ColorVariableDarkModeName.NavyHover,
  [ColorVariableName.OverlayButton]: ColorVariableDarkModeName.OverlayButton,
  [ColorVariableName.PhantomPurple]: ColorVariableDarkModeName.PhantomPurple,
  [ColorVariableName.Pink]: ColorVariableDarkModeName.Pink,
  [ColorVariableName.PinkVerticalGradient]:
    ColorVariableDarkModeName.PinkVerticalGradient,
  [ColorVariableName.PopheadzDarkGray]:
    ColorVariableDarkModeName.PopheadzDarkGray,
  [ColorVariableName.PopheadzLightGray]:
    ColorVariableDarkModeName.PopheadzLightGray,
  [ColorVariableName.Primary]: ColorVariableDarkModeName.Primary,
  [ColorVariableName.ProgressBar]: ColorVariableDarkModeName.ProgressBar,
  [ColorVariableName.Purple]: ColorVariableDarkModeName.Purple,
  [ColorVariableName.PurpleGradient]: ColorVariableDarkModeName.PurpleGradient,
  [ColorVariableName.PurpleGradientForText]:
    ColorVariableDarkModeName.PurpleGradientForText,
  [ColorVariableName.PurpleGradientHover]:
    ColorVariableDarkModeName.PurpleGradientHover,
  [ColorVariableName.Red]: ColorVariableDarkModeName.Red,
  [ColorVariableName.RedGradient]: ColorVariableDarkModeName.RedGradient,
  [ColorVariableName.RedHover]: ColorVariableDarkModeName.RedHover,
  [ColorVariableName.Scheme11]: ColorVariableDarkModeName.Scheme11,
  [ColorVariableName.Scheme12]: ColorVariableDarkModeName.Scheme12,
  [ColorVariableName.Scheme21]: ColorVariableDarkModeName.Scheme21,
  [ColorVariableName.Scheme22]: ColorVariableDarkModeName.Scheme22,
  [ColorVariableName.Scheme31]: ColorVariableDarkModeName.Scheme31,
  [ColorVariableName.Scheme32]: ColorVariableDarkModeName.Scheme32,
  [ColorVariableName.Scheme41]: ColorVariableDarkModeName.Scheme41,
  [ColorVariableName.Scheme42]: ColorVariableDarkModeName.Scheme42,
  [ColorVariableName.Scheme51]: ColorVariableDarkModeName.Scheme51,
  [ColorVariableName.Scheme52]: ColorVariableDarkModeName.Scheme52,
  [ColorVariableName.Scheme61]: ColorVariableDarkModeName.Scheme61,
  [ColorVariableName.Scheme62]: ColorVariableDarkModeName.Scheme62,
  [ColorVariableName.BrightGray]: ColorVariableDarkModeName.BrightGray,
  [ColorVariableName.MediumBlue]: ColorVariableDarkModeName.MediumBlue,
  [ColorVariableName.AliceBlue]: ColorVariableDarkModeName.AliceBlue,
  [ColorVariableName.Sinopia]: ColorVariableDarkModeName.Sinopia,
  [ColorVariableName.Cultured]: ColorVariableDarkModeName.Cultured,
  [ColorVariableName.CadmiumGreen]: ColorVariableDarkModeName.CadmiumGreen,
  [ColorVariableName.Seashell]: ColorVariableDarkModeName.Seashell,
  [ColorVariableName.MaximumRed]: ColorVariableDarkModeName.MaximumRed,
  [ColorVariableName.GreenishGray]: ColorVariableDarkModeName.GreenishGray,
  [ColorVariableName.MidnightBlue]: ColorVariableDarkModeName.MidnightBlue,
  [ColorVariableName.AntiFlashWhite]: ColorVariableDarkModeName.AntiFlashWhite,
  [ColorVariableName.DarkGunmetal]: ColorVariableDarkModeName.DarkGunmetal,
  [ColorVariableName.Secondary]: ColorVariableDarkModeName.Secondary,
  [ColorVariableName.Shader]: ColorVariableDarkModeName.Shader,
  [ColorVariableName.SkeletonBase]: ColorVariableDarkModeName.SkeletonBase,
  [ColorVariableName.SkeletonHighlight]:
    ColorVariableDarkModeName.SkeletonHighlight,
  [ColorVariableName.SpotlightOverlay]:
    ColorVariableDarkModeName.SpotlightOverlay,
  [ColorVariableName.Tertiary]: ColorVariableDarkModeName.Tertiary,
  [ColorVariableName.Transparent]: ColorVariableDarkModeName.Transparent,
  [ColorVariableName.WebsiteBackground]:
    ColorVariableDarkModeName.WebsiteBackground,
  [ColorVariableName.White]: ColorVariableDarkModeName.White,
  [ColorVariableName.Yellow]: ColorVariableDarkModeName.Yellow,
};

export default COLOR_VARIABLE_TO_DARK_MODE;
