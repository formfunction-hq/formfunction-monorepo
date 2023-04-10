import useCampaignContext from "hooks/useCampaignContext";
import useCampaignV2Context from "hooks/useCampaignV2Context";
import ColorScheme from "types/ColorScheme";

export default function useCampaignColorScheme(): ColorScheme {
  const { colorSchemeColors: colorSchemeV2 } = useCampaignV2Context();
  const { colorScheme } = useCampaignContext();
  return colorScheme ?? colorSchemeV2;
}
