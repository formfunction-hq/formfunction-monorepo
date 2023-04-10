import useBreakpoint from "hooks/useBreakpoint";

export default function useSeriesGridFullWidthColumnCount(multiple = 1) {
  const {
    isSeriesGridFullWidthOneColumnBreakpoint,
    isSeriesGridFullWidthTwoColumnsBreakpoint,
  } = useBreakpoint();

  if (isSeriesGridFullWidthOneColumnBreakpoint) {
    return 1 * multiple;
  }

  if (isSeriesGridFullWidthTwoColumnsBreakpoint) {
    return 2 * multiple;
  }

  return 3 * multiple;
}
