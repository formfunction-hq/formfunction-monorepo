import useBreakpoint from "hooks/useBreakpoint";

export default function useCampaignFundingTierPreviewGridFullWidthColumnCount(
  multiple = 1
) {
  const {
    isCampaignFundingTierPreviewGridFullWidthOneColumnBreakpoint,
    isCampaignFundingTierPreviewGridFullWidthTwoColumnsBreakpoint,
    isCampaignFundingTierPreviewGridFullWidthThreeColumnsBreakpoint,
  } = useBreakpoint();

  if (isCampaignFundingTierPreviewGridFullWidthOneColumnBreakpoint) {
    return 1 * multiple;
  }

  if (isCampaignFundingTierPreviewGridFullWidthTwoColumnsBreakpoint) {
    return 2 * multiple;
  }

  if (isCampaignFundingTierPreviewGridFullWidthThreeColumnsBreakpoint) {
    return 3 * multiple;
  }

  return 4 * multiple;
}
