import ColorVariableLightModeName from "types/enums/ColorVariableLightModeName";
import ColorVariableName from "types/enums/ColorVariableName";

// This ensures that if we add a variable to ColorVariables.css, we must add it to
// ColorVariablesLightMode.css (otherwise, TypeScript will complain
// after yarn gen-colors is run).
const COLOR_VARIABLE_TO_LIGHT_MODE: {
  [key in ColorVariableName]: ColorVariableLightModeName;
} = {
  [ColorVariableName.ArtistPillShadow]:
    ColorVariableLightModeName.ArtistPillShadow,
  [ColorVariableName.BackgroundOverlay]:
    ColorVariableLightModeName.BackgroundOverlay,
  [ColorVariableName.BackgroundOverlayDark]:
    ColorVariableLightModeName.BackgroundOverlayDark,
  [ColorVariableName.BlueGradient]: ColorVariableLightModeName.BlueGradient,
  [ColorVariableName.BrightPurple]: ColorVariableLightModeName.BrightPurple,
  [ColorVariableName.CardBackground]: ColorVariableLightModeName.CardBackground,
  [ColorVariableName.ClickableAreaBackground]:
    ColorVariableLightModeName.ClickableAreaBackground,
  [ColorVariableName.DarkCerulean]: ColorVariableLightModeName.DarkCerulean,
  [ColorVariableName.DarkPurple]: ColorVariableLightModeName.DarkPurple,
  [ColorVariableName.Dimmer]: ColorVariableLightModeName.Dimmer,
  [ColorVariableName.Error]: ColorVariableLightModeName.Error,
  [ColorVariableName.FloatingElement]:
    ColorVariableLightModeName.FloatingElement,
  [ColorVariableName.Footer]: ColorVariableLightModeName.Footer,
  [ColorVariableName.Ghost]: ColorVariableLightModeName.Ghost,
  [ColorVariableName.Green]: ColorVariableLightModeName.Green,
  [ColorVariableName.GreenGradient]: ColorVariableLightModeName.GreenGradient,
  [ColorVariableName.LightBlue]: ColorVariableLightModeName.LightBlue,
  [ColorVariableName.LightPink]: ColorVariableLightModeName.LightPink,
  [ColorVariableName.LightPurple]: ColorVariableLightModeName.LightPurple,
  [ColorVariableName.LightPurpleGradient]:
    ColorVariableLightModeName.LightPurpleGradient,
  [ColorVariableName.LightPurpleVerticalGradient]:
    ColorVariableLightModeName.LightPurpleVerticalGradient,
  [ColorVariableName.LightPurpleHover]:
    ColorVariableLightModeName.LightPurpleHover,
  [ColorVariableName.LinkWater]: ColorVariableLightModeName.LinkWater,
  [ColorVariableName.MenuPopup]: ColorVariableLightModeName.MenuPopup,
  [ColorVariableName.Navy]: ColorVariableLightModeName.Navy,
  [ColorVariableName.NavyHover]: ColorVariableLightModeName.NavyHover,
  [ColorVariableName.OverlayButton]: ColorVariableLightModeName.OverlayButton,
  [ColorVariableName.PhantomPurple]: ColorVariableLightModeName.PhantomPurple,
  [ColorVariableName.Pink]: ColorVariableLightModeName.Pink,
  [ColorVariableName.PinkVerticalGradient]:
    ColorVariableLightModeName.PinkVerticalGradient,
  [ColorVariableName.PopheadzDarkGray]:
    ColorVariableLightModeName.PopheadzDarkGray,
  [ColorVariableName.PopheadzLightGray]:
    ColorVariableLightModeName.PopheadzLightGray,
  [ColorVariableName.Primary]: ColorVariableLightModeName.Primary,
  [ColorVariableName.ProgressBar]: ColorVariableLightModeName.ProgressBar,
  [ColorVariableName.Purple]: ColorVariableLightModeName.Purple,
  [ColorVariableName.PurpleGradient]: ColorVariableLightModeName.PurpleGradient,
  [ColorVariableName.PurpleGradientForText]:
    ColorVariableLightModeName.PurpleGradientForText,
  [ColorVariableName.PurpleGradientHover]:
    ColorVariableLightModeName.PurpleGradientHover,
  [ColorVariableName.Red]: ColorVariableLightModeName.Red,
  [ColorVariableName.RedGradient]: ColorVariableLightModeName.RedGradient,
  [ColorVariableName.RedHover]: ColorVariableLightModeName.RedHover,
  [ColorVariableName.Scheme11]: ColorVariableLightModeName.Scheme11,
  [ColorVariableName.Scheme12]: ColorVariableLightModeName.Scheme12,
  [ColorVariableName.Scheme21]: ColorVariableLightModeName.Scheme21,
  [ColorVariableName.Scheme22]: ColorVariableLightModeName.Scheme22,
  [ColorVariableName.Scheme31]: ColorVariableLightModeName.Scheme31,
  [ColorVariableName.Scheme32]: ColorVariableLightModeName.Scheme32,
  [ColorVariableName.Scheme41]: ColorVariableLightModeName.Scheme41,
  [ColorVariableName.Scheme42]: ColorVariableLightModeName.Scheme42,
  [ColorVariableName.Scheme51]: ColorVariableLightModeName.Scheme51,
  [ColorVariableName.Scheme52]: ColorVariableLightModeName.Scheme52,
  [ColorVariableName.Scheme61]: ColorVariableLightModeName.Scheme61,
  [ColorVariableName.Scheme62]: ColorVariableLightModeName.Scheme62,
  [ColorVariableName.BrightGray]: ColorVariableLightModeName.BrightGray,
  [ColorVariableName.MediumBlue]: ColorVariableLightModeName.MediumBlue,
  [ColorVariableName.AliceBlue]: ColorVariableLightModeName.AliceBlue,
  [ColorVariableName.Sinopia]: ColorVariableLightModeName.Sinopia,
  [ColorVariableName.Cultured]: ColorVariableLightModeName.Cultured,
  [ColorVariableName.CadmiumGreen]: ColorVariableLightModeName.CadmiumGreen,
  [ColorVariableName.Seashell]: ColorVariableLightModeName.Seashell,
  [ColorVariableName.MaximumRed]: ColorVariableLightModeName.MaximumRed,
  [ColorVariableName.GreenishGray]: ColorVariableLightModeName.GreenishGray,
  [ColorVariableName.MidnightBlue]: ColorVariableLightModeName.MidnightBlue,
  [ColorVariableName.AntiFlashWhite]: ColorVariableLightModeName.AntiFlashWhite,
  [ColorVariableName.DarkGunmetal]: ColorVariableLightModeName.DarkGunmetal,
  [ColorVariableName.Secondary]: ColorVariableLightModeName.Secondary,
  [ColorVariableName.Shader]: ColorVariableLightModeName.Shader,
  [ColorVariableName.SkeletonBase]: ColorVariableLightModeName.SkeletonBase,
  [ColorVariableName.SkeletonHighlight]:
    ColorVariableLightModeName.SkeletonHighlight,
  [ColorVariableName.SpotlightOverlay]:
    ColorVariableLightModeName.SpotlightOverlay,
  [ColorVariableName.Tertiary]: ColorVariableLightModeName.Tertiary,
  [ColorVariableName.Transparent]: ColorVariableLightModeName.Transparent,
  [ColorVariableName.WebsiteBackground]:
    ColorVariableLightModeName.WebsiteBackground,
  [ColorVariableName.White]: ColorVariableLightModeName.White,
  [ColorVariableName.Yellow]: ColorVariableLightModeName.Yellow,
};

export default COLOR_VARIABLE_TO_LIGHT_MODE;
