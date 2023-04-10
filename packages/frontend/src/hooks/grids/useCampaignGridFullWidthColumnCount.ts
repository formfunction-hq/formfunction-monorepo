import useBreakpoint from "hooks/useBreakpoint";

export default function useCampaignGridFullWidthColumnCount(multiple = 1) {
  const {
    isCampaignGridFullWidthOneColumnBreakpoint,
    isCampaignGridFullWidthTwoColumnsBreakpoint,
  } = useBreakpoint();

  if (isCampaignGridFullWidthOneColumnBreakpoint) {
    return 1 * multiple;
  }

  if (isCampaignGridFullWidthTwoColumnsBreakpoint) {
    return 2 * multiple;
  }

  return 3 * multiple;
}
