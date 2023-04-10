import useBreakpoint from "hooks/useBreakpoint";

export default function useSpotlightsGridFullWidthColumnCount(multiple = 1) {
  const {
    isSpotlightsGridFullWidthOneColumnBreakpoint,
    isSpotlightsGridFullWidthTwoColumnsBreakpoint,
    isSpotlightsGridFullWidthThreeColumnsBreakpoint,
  } = useBreakpoint();

  if (isSpotlightsGridFullWidthOneColumnBreakpoint) {
    return 1 * multiple;
  }

  if (isSpotlightsGridFullWidthTwoColumnsBreakpoint) {
    return 2 * multiple;
  }

  if (isSpotlightsGridFullWidthThreeColumnsBreakpoint) {
    return 3 * multiple;
  }

  return 4 * multiple;
}
